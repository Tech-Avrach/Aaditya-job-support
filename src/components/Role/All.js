import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
  CardFooter,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import * as Ionicons from "react-icons/io";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import { addPermission, retrieveRole } from "../../redux/actions/roles";
import RoleService from "../../redux/services/role.service";
import Loader from "react-loaders";

toast.configure();

const All = () => {
  const { role } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState({
    isActive: 1,
  });
  const [checkedRows, setCheckedRows] = useState({});
  const [permissions, setPermissions] = useState([]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedRole((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCheckboxChange = (key, permissionType) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [key]: {
        ...prevCheckedRows[key],
        [permissionType]: !prevCheckedRows[key]?.[permissionType],
      },
    }));
    console.log(key, permissionType);
  };
  

  useEffect(() => {
    const getPermission = () => {
      RoleService.getpermission(selectedRole.isActive)
        .then((data) => {
          setPermissions(data.data.data);
          const initialCheckedRows = {};

          console.log(data.data.data);
  
          data.data.data.forEach((permission, index) => {
            initialCheckedRows[permission.moduleId] = {
              create: permission.create,
              read: permission.read,
              update: permission.update,
              delete: permission.delete,
              statusUpdate: permission.statusUpdate, 
              restore: permission.restore, 
            };
          });
  
          setCheckedRows(initialCheckedRows);
        })
        .catch((error) => {
          setCheckedRows({});
          console.error("Error fetching permissions:", error);
        });
    };
    getPermission();
  }, [selectedRole.isActive]);
  

  const generatePayload = () => {
    const permissions = Object.keys(checkedRows).map((key, index) => ({
      moduleId: parseInt(key),
      create: checkedRows[key].create ? 1 : 0,
      read: checkedRows[key].read ? 1 : 0,
      update: checkedRows[key].update ? 1 : 0,
      delete: checkedRows[key].delete ? 1 : 0,
      statusUpdate: checkedRows[key].statusUpdate ? 1 : 0, // Add this line
      restore: checkedRows[key].restore ? 1 : 0, // Add this line
    }));

    console.log(permissions);
  
    return {
      roleId: selectedRole?.isActive,
      permissions,
    };
  };
  

  useEffect(() => {
    dispatch(retrieveRole());
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Module",
        selector: (row) => row.feature,
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Create",
        button: true,
        minWidth: "150px",
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => (
          <input
            name="create"
            type="checkbox"
            checked={checkedRows[row.id]?.create || false}
            onChange={() => handleCheckboxChange(row.id, "create")}
          />
        ),
      },
      {
        name: "Read",
        button: true,
        minWidth: "150px",
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => (
          <input
            name="read"
            type="checkbox"
            checked={checkedRows[row.id]?.read || false}
            onChange={() => handleCheckboxChange(row.id, "read")}
          />
        ),
      },
      {
        name: "Status Update",
        button: true,
        minWidth: "150px",
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => (
          <input
            name="update"
            type="checkbox"
            checked={checkedRows[row.id]?.update || false}
            onChange={() => handleCheckboxChange(row.id, "update")}
          />
        ),
      },
      {
        name: "Delete",
        button: true,
        minWidth: "200px",
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => (
          <input
            name="delete"
            type="checkbox"
            checked={checkedRows[row.id]?.delete || false}
            onChange={() => handleCheckboxChange(row.id, "delete")}
          />
        ),
      },
      // {
      //   name: "Status Update", // Add this column
      //   button: true,
      //   minWidth: "150px",
      //   headerStyle: {
      //     textAlign: "center",
      //   },
      //   cell: (row) => (
      //     <input
      //       name="statusUpdate"
      //       type="checkbox"
      //       checked={checkedRows[row.id]?.statusUpdate || false}
      //       onChange={() => handleCheckboxChange(row.id, "statusUpdate")}
      //     />
      //   ),
      // },
      // {
      //   name: "Restore", // Add this column
      //   button: true,
      //   minWidth: "150px",
      //   headerStyle: {
      //     textAlign: "center",
      //   },
      //   cell: (row) => (
      //     <input
      //       name="restore"
      //       type="checkbox"
      //       checked={checkedRows[row.id]?.restore || false}
      //       onChange={() => handleCheckboxChange(row.id, "restore")}
      //     />
      //   ),
      // },
    ],
    [checkedRows, selectedRole]
  );
  

  const handleSubmit = () => {
    const payload = generatePayload();
    dispatch(addPermission(payload))
      .then((response) => {
        toast("Permissions created successfully!", {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "success",
        });
      })
      .catch((error) => {
        toast(error?.response?.data.message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "error",
        });
      });
  };

  const Module = [
    { id: 1, feature: "Users" },
    { id: 2, feature: "Seller" },
    { id: 8, feature: "Games Ads" },
    { id: 7, feature: "Dispute Resolution" },
  ];

  const subHeaderComponent = useMemo(() => {
    return (
      <Col>
        <FormGroup>
          <Label for="isActive">Select Role</Label>
          <Input
            type="select"
            name="isActive"
            id="isActive"
            value={selectedRole.isActive != null ? selectedRole.isActive : ""}
            onChange={handleSelectChange}
          >
            {role &&
              role
                .filter((item) => item.id !== 1) // Filter out the role with id 1
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
          </Input>
        </FormGroup>
      </Col>
    );
  }, [role, selectedRole.isActive]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-network icon-gradient bg-plum-plate"
      pageHeading="Permission"
      pageSubTitle="Please provide permission for the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={Module}
                subHeader
                subHeaderComponent={subHeaderComponent}
              />
            </CardBody>
            <CardFooter className="d-block">
              <Button
                size="lg"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
                disabled={selectedRole.isActive === 0}
              >
                Provide Permission
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default All;
