import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import IconContainer from "../Common/IconContainer";
import * as Ionicons from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteBanner,
    restoreBanner,
    retrieveBanners,
} from "../../redux/actions/banner";
import { toast, Slide } from "react-toastify";
import FilterComponent from "../../helpers/FilterComponent";
import debounceFunction from "../../helpers/Debounce";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import styles from "../../assets/preview.module.scss";
import PageContainer from "../Layout/PageContainer";

const EditIcon = Ionicons["IoIosCreate"];
const DeleteIcon = Ionicons["IoIosTrash"];
const RestoreIcon = Ionicons["IoIosRefresh"];

toast.configure();

const BannerList = () => {
    const navigate = useNavigate();
    const { banners = [], totalBannercount = 0 } = useSelector((state) => state.banners);
    console.log(banners);
    const { permissionMap: permissions } = useSelector((state) => state.auth);
    const currentModuleId = 18;
    const permission = permissions[currentModuleId];
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const param = {
        keyword: filterText,
        page: currentPage,
        perPage: perPage,
        all: true,
        active: true,
    };

    const fetchBanners = useCallback(async () => {
        try {
            await dispatch(retrieveBanners(param));
        } catch (error) {
            console.error("Failed to fetch banners:", error);
            toast(error.response?.data?.message || "An error occurred", {
                transition: Slide,
                closeButton: true,
                autoClose: 3000,
                position: "top-right",
                type: "error",
            });
        }
    }, [dispatch, param]);

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleViewClick = (row) => navigate(`/banner/${row.publicId}`);

    const handleDelete = (e, id, action) => {
        e.preventDefault();
        const handleAction = action === "delete" ? deleteBanner : restoreBanner;
        dispatch(handleAction(id, param))
            .then(() => {
                toast(`Banner ${action}d successfully!`, {
                    transition: Slide,
                    closeButton: true,
                    autoClose: 3000,
                    position: "top-right",
                    type: "success",
                });
                fetchBanners();
            })
            .catch((error) => {
                console.error(`Failed to ${action} banner:`, error);
                toast(error.response?.data?.message || "An error occurred", {
                    transition: Slide,
                    closeButton: true,
                    autoClose: 3000,
                    position: "top-right",
                    type: "error",
                });
            });
    };

    const columns = useMemo(() => {
        const commonColumns = [
            {
                name: "Banner Name ",
                selector: (row) => row?.bannerName || 'N/A',
                sortable: true,
                headerStyle: {
                    textAlign: "center",
                },
            },
            {
                name: "Banner",
                selector: (row) => (
                    <div
                        className={styles.previewContainer}
                        style={{
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <img
                            width={100}
                            src={row?.bannerUrl || 'default.jpg'}
                            alt="preview"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${process.env.REACT_APP_PROFILE_IMAGE_URL}` + `user.png`;
                            }}
                        />
                    </div>
                ),
                sortable: true,
                headerStyle: {
                    textAlign: "center",
                },
            },
            {
                name: "Original Price",
                selector: (row) => `${row?.originalPrice}`,
                sortable: true,
                width: "230px",
                headerStyle: {
                    textAlign: "center",
                },
            },
            {
                name: "Discount Price",
                selector: (row) => `${row?.discountedPrice}`,
                sortable: true,
                width: "230px",
                headerStyle: {
                    textAlign: "center",
                },
            },
            {
                name: "Currency",
                selector: (row) => `${row?.currency}`,
                sortable: true,
                width: "230px",
                headerStyle: {
                    textAlign: "center",
                },
            },
            {
                name: "Created At",
                selector: (row) => format(new Date(row?.createdAt), 'PPpp'),
                sortable: true,
                width: "230px",
                headerStyle: {
                    textAlign: "center",
                },
            },
          
        ];

        const renderActionCell = (row) => {
            const isDeleted = row?.deletedAt && row?.deletedAt !== null;
            if (isDeleted) {
                return permission?.delete ? (
                    <IconContainer
                        id={"restore-icon"}
                        Icon={RestoreIcon}
                        handleOnClick={(e) => handleDelete(e, row?.publicId, "restore")}
                        text={"Restore"}
                        iconColor={"#3ac47d"}
                    />
                ) : null;
            }

            return (
                <>
                    {permission?.update ? (
                        <IconContainer
                            id={"edit-icon"}
                            Icon={EditIcon}
                            handleOnClick={() => handleViewClick(row)}
                            text="Edit"
                        />
                    ) : null}
                    {permission?.delete ? (
                        <IconContainer
                            id={"delete-icon"}
                            Icon={DeleteIcon}
                            handleOnClick={(e) => handleDelete(e, row?.publicId, "delete")}
                            text={"Delete"}
                            iconColor={"#d92550"}
                        />
                    ) : null}
                </>
            );
        };

        if (
            permission?.delete === 0 &&
            permission?.update === 0 
        ) {
            return commonColumns;
        }

        return [
            ...commonColumns,
            {
                name: "Actions",
                button: true,
                minWidth: "150px",
                headerStyle: { textAlign: "center" },
                cell: renderActionCell,
            },
        ];
    }, [permission, handleViewClick, handleDelete]);

    const debounceSearch = useCallback(
        debounceFunction((nextValue) => {
            setFilterText(nextValue);
            fetchBanners();
        }, 1000),
        [fetchBanners]
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
                fetchBanners();
            }
        };

        return (
            <FilterComponent
                onFilter={(event) => debounceSearch(event.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, debounceSearch, resetPaginationToggle, fetchBanners]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchBanners();
    };

    const handlePerRowsChange = (newPerPage) => {
        setPerPage(newPerPage);
        fetchBanners();
    };

    return (
        <PageContainer
            pageTitleIcon="pe-7s-photo icon-gradient bg-plum-plate"
            pageHeading={"Banners"}
            pageSubTitle={"List of all banners in the system"}
        >
            <Row>
                <Col>
                    <Card className="main-card mb-3">
                        <CardBody>
                            {console.log("Datatable")}
                            <DataTable
                                columns={columns}
                                data={banners}
                                pagination
                                paginationServer
                                paginationTotalRows={totalBannercount}
                                paginationDefaultPage={currentPage}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                                subHeader
                                subHeaderComponent={subHeaderComponent}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default BannerList;
