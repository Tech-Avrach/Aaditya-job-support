import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
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

const EditIcon = Ionicons["IoIosCreate"];
const DeleteIcon = Ionicons["IoIosTrash"];
const RestoreIcon = Ionicons["IoIosRefresh"];
// const ActiveIcon = Ionicons["IoIosCheckmarkCircleOutline"];
// const InactiveIcon = Ionicons["IoIosCloseCircle"];

toast.configure();

const BannerList = () => {
    const navigate = useNavigate();
    const { banners, totalBannercount } = useSelector((state) => state.banners);
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

    const fetchBanners = useCallback(() => {
        dispatch(retrieveBanners(param));
    }, [dispatch, filterText, currentPage, perPage]);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners, currentPage, perPage, filterText]);

    const handleViewClick = (row) => navigate(`/banner/${row.publicId}`);

    // const handleStatusToggle = (e, id, isActive) => {
    //     e.preventDefault();
    //     dispatch(activeStatusFaq(id, isActive, param))
    //         .then(() => {
    //             toast(`Account ${isActive ? "activated" : "deactivated"} successfully!`, {
    //                 transition: Slide,
    //                 closeButton: true,
    //                 autoClose: 3000,
    //                 position: "top-right",
    //                 type: "success",
    //             });
    //             fetchBanners();
    //         })
    //         .catch((error) => {
    //             toast(error.response?.data?.message || "An error occurred", {
    //                 transition: Slide,
    //                 closeButton: true,
    //                 autoClose: 3000,
    //                 position: "top-right",
    //                 type: "error",
    //             });
    //         });
    // };

    const handleDelete = (e, id, action) => {
        e.preventDefault();
        if (action === "delete") {
            dispatch(deleteBanner(id, param))
                .then((res) => {
                    toast("Banner deleted successfully!", {
                        transition: Slide,
                        closeButton: true,
                        autoClose: 3000,
                        position: "top-right",
                        type: "success",
                    });
                    fetchBanners();
                })
                .catch((error) => {
                    console.log(error);
                    toast(error.response?.data?.message || "An error occurred", {
                        transition: Slide,
                        closeButton: true,
                        autoClose: 3000,
                        position: "top-right",
                        type: "error",
                    });
                });
        } else {
            dispatch(restoreBanner(id))
                .then(() => {
                    toast("Banner restored successfully!", {
                        transition: Slide,
                        closeButton: true,
                        autoClose: 3000,
                        position: "top-right",
                        type: "success",
                    });
                    fetchBanners();
                })
                .catch((error) => {
                    toast(error.response?.data?.message || "An error occurred", {
                        transition: Slide,
                        closeButton: true,
                        autoClose: 3000,
                        position: "top-right",
                        type: "error",
                    });
                });
        }
    };

    const columns = useMemo(() => {
        const commonColumns = [
            // {
            //     name: "Id",
            //     selector: (row) => row.id,
            //     sortable: true,
            //     width: "100px",
            //     headerStyle: {
            //         textAlign: "center",
            //     },
            // },
            {
                name: "Public Id",
                selector: (row) => row?.publicId,
                sortable: true,
                width: "100px",
                headerStyle: {
                    textAlign: "center",
                },
            },
            {
                name: "Banner Name ",
                selector: (row) => row?.bannerName,
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
                            src={row?.bannerUrl}
                            alt="preview"
                            onError={() =>
                                `${process.env.REACT_APP_PROFILE_IMAGE_URL}` + `user.png`
                            }
                        />
                    </div>
                ),
                sortable: true,
                headerStyle: {
                    textAlign: "center",
                },
            },
            // {
            //     name: "Status",
            //     selector: (row) => (row.isActive ? "Active" : "Inactive"),
            //     sortable: true,
            //     width: "150px",
            //     headerStyle: {
            //         textAlign: "center",
            //     },
            // },
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
                    {/* {permission?.statusUpdate ? (
                        <IconContainer
                            id={"subadmin-active-icon"}
                            Icon={row.isActive ? ActiveIcon : InactiveIcon}
                            text={row.isActive ? "Active" : "Inactive"}
                            iconColor={row.isActive ? "#3ac47d" : "#d92550"}
                            handleOnClick={(e) => handleStatusToggle(e, row.publicId, !row.isActive)}
                        />
                    ) : null} */}
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
            fetchBanners();
        }, 1000),
        [fetchBanners]
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
                dispatch(retrieveBanners({ ...param, keyword: "", page: 1 }));
            }
        };

        return (
            <FilterComponent
                onFilter={(event) => {
                    setFilterText(event.target.value);
                    debounceSearch(event.target.value);
                }}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, debounceSearch, resetPaginationToggle, dispatch, param]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = (newPerPage) => {
        setPerPage(newPerPage);
    };

    return (
        <Row>
            <Col>
                <Card className="main-card mb-3">
                    <CardHeader className="card-header-sm">
                        <div className="card-header-title font-size-lg text-capitalize fw-normal">
                            Banners
                        </div>
                    </CardHeader>
                    <CardBody>
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
    );
};

export default BannerList;