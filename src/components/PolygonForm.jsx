import { useEffect, useReducer, useState } from "react";
import PolygonMapParameter from "./PolygonMapParameter";
import { getField } from "../utils/getField";
import { buildApiUrl } from "../hooks/BuildApiUrl";
import useFetchWithoutBaseUrl from "../hooks/UseFetchWithoutBaseUrl";
// import initialState from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
function PolygonForm({ schema, enable }) {
  // const [cartState, cartReducerDispatch] = useReducer(
  //   reducer,
  //   initialState(4000, schema?.idField), //!make pagination
  // );
  const getdataSourceAPI = (query, skip, take) => {
    return buildApiUrl(query, {
      pageIndex: skip + 1,
      pageSize: take,
      // ...row,
    });
  };
  const parameters = schema.dashboardFormSchemaParameters;
  const fieldsType = {
    polygon: getField(parameters, "drawPolygon"),
    cityISO_CodeValue: getField(parameters, "cityISOCodeValue"),
    description: getField(parameters, "areaDescription"),
    centerLatitudePoint: getField(parameters, "centerLatitudePoint"), //the center point of the polygon
    centerLongitudePoint: getField(parameters, "centerLongitudePoint"),
    areaName: getField(parameters, "areaName"),
    // centerZoom: getField(parameters, "centerZoom"),
    buildNumber: getField(parameters, "buildNumber"),
    floorNumber: getField(parameters, "floorNumber"),
    radius: getField(parameters, "radius"), //the max radius of the polygon
  };
  const [value, setValue] = useState([{}]);
  const [boundsData, setBoundsData] = useState([]);
  const dataSourceAPI = (query, data) => {
    return buildApiUrl(query, {
      ...data,
    });
  };
  const staticGetAction = {
    dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
    dashboardFormActionMethodType: "Get",
    routeAdderss: "AreaPolygon/GetAreasPolygons",
    body: "string",
    returnPropertyName: "string",
    projectProxyRoute: "BrandingMartLogistic",
    dashboardFormSchemaActionQueryParams: [
      {
        dashboardFormSchemaActionQueryParameterID:
          "26bc9d7e-781f-4638-a25d-50b9c516e00d",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "NorthEastLatitude",
        dashboardFormParameterField: "northEastLatitude",
      },
      {
        dashboardFormSchemaActionQueryParameterID:
          "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "NorthEastLongitude",
        dashboardFormParameterField: "northEastLongitude",
      },
      {
        dashboardFormSchemaActionQueryParameterID:
          "26bc9d7e-781f-4638-a25d-50b9c516e00d",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "SouthWestLatitude",
        dashboardFormParameterField: "southWestLatitude",
      },
      {
        dashboardFormSchemaActionQueryParameterID:
          "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "SouthWestLongitude",
        dashboardFormParameterField: "southWestLongitude",
      },
    ],
  };
  const { data } = useFetchWithoutBaseUrl(
    dataSourceAPI(staticGetAction, boundsData),
  );
  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);
  return (
    <div>
      <PolygonMapParameter
        enable={enable}
        value={value}
        fieldsType={fieldsType}
        setBoundsData={setBoundsData}
      />
    </div>
  );
}

export default PolygonForm;
