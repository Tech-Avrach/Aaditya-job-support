import React, { useMemo } from "react";
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

import DataTable from "react-data-table-component";
import {
  adTypes,
  categories,
  currencies,
  filterOptions,
  platforms,
  regions,
  statuslist,
} from "./data";

function FilterModal({
  Open,
  toggle,
  filterValues,
  handleFilterChange,
  handleAllFilter,
  checkedRows,
  handleCheckboxChange,
}) {
  const columns = useMemo(
    () => [
      {
        name: "Filter",
        button: true,
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => (
          <input
            type="checkbox"
            checked={checkedRows[row.key] || false}
            onChange={() => handleCheckboxChange(row.key)}
          />
        ),
      },
      {
        name: "Key",
        selector: (row) => row.label,
        // sortable: true,
        width: "150px",
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Game Name",
        selector: (row) => row.gameName,
        // sortable: true,
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => {
          const isPresent = Object.keys(checkedRows).find(
            (item) => checkedRows[row.key] === true
          );
          switch (row.key) {
            case "platform":
              return (
                <Input
                  disabled={!isPresent}
                  type="select"
                  name="platform"
                  id="platform"
                  value={
                    filterValues.platform != null ? filterValues.platform : ""
                  }
                  onChange={handleFilterChange}
                >
                  <option value=""> Select Platform </option>
                  {platforms &&
                    platforms.map((platform, index) => (
                      <option key={index} value={platform.code}>
                        {platform.name}
                      </option>
                    ))}
                </Input>
              );

            case "category":
              return (
                <Input
                  disabled={!isPresent}
                  type="select"
                  name="category"
                  id="category"
                  value={
                    filterValues.category != null ? filterValues.category : ""
                  }
                  onChange={handleFilterChange}
                >
                  <option value=""> Select Category </option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category.code}>
                        {category.name}
                      </option>
                    ))}
                </Input>
              );

            case "currency":
              return (
                <Input
                  disabled={!isPresent}
                  type="select"
                  name="currency"
                  id="currency"
                  value={
                    filterValues.currency != null ? filterValues.currency : ""
                  }
                  onChange={handleFilterChange}
                >
                  <option value=""> Select Category </option>
                  {currencies &&
                    currencies.map((currency, index) => (
                      <option key={index} value={currency.code}>
                        {currency.name}
                      </option>
                    ))}
                </Input>
              );
            case "status":
              return (
                <Input
                  disabled={!isPresent}
                  type="select"
                  name="status"
                  id="status"
                  value={filterValues.status != null ? filterValues.status : ""}
                  onChange={handleFilterChange}
                >
                  <option value=""> Select Status </option>
                  {statuslist &&
                    statuslist.map((status, index) => (
                      <option key={index} value={status.code}>
                        {status.name}
                      </option>
                    ))}
                </Input>
              );
            case "adType":
              return (
                <Input
                  disabled={!isPresent}
                  type="select"
                  name="adType"
                  id="adType"
                  value={filterValues.adType != null ? filterValues.adType : ""}
                  onChange={handleFilterChange}
                >
                  <option value=""> Select AdType </option>
                  {adTypes &&
                    adTypes.map((adType, index) => (
                      <option key={index} value={adType.code}>
                        {adType.name}
                      </option>
                    ))}
                </Input>
              );

            case "region":
              return (
                <Input
                  disabled={!isPresent}
                  type="select"
                  name="region"
                  id="region"
                  value={filterValues.region != null ? filterValues.region : ""}
                  onChange={handleFilterChange}
                >
                  <option value=""> Select Region </option>
                  {regions &&
                    regions.map((region, index) => (
                      <option key={index} value={region.code}>
                        {region.name}
                      </option>
                    ))}
                </Input>
              );

            default:
              return (
                <Input
                  disabled={!isPresent}
                  type="text"
                  className="w-100"
                  name={row.key}
                  placeholder={`${row.key} here..`}
                  onChange={handleFilterChange}
                  value={filterValues?.row?.key}
                />
              );
          }
        },
      },
    ],
    [checkedRows, filterValues]
  );
  return (
    <div>
      <Modal isOpen={Open}>
        <ModalHeader toggle={toggle}>Filter</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <DataTable columns={columns} data={filterOptions} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleAllFilter();
              toggle();
            }}
          >
            Apply
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FilterModal;
