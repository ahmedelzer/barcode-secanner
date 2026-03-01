import { useEffect, useState } from "react";
import PolygonMapParameter from "./PolygonMapParameter";
import { getField } from "../utils/getField";
import { buildApiUrl } from "../hooks/BuildApiUrl";
import useFetchWithoutBaseUrl from "../hooks/UseFetchWithoutBaseUrl";

function PolygonForm({ schema, enable }) {
  //   const { localization } = useContext(LanguageContext);

  //   // const schema =
  //   //   schemas &&
  //   //   schemas?.find((schema) => schema.schemaType === "FilesContainer");
  //   // console.log(schema);

  //   const [selectedFiles, setSelectedFiles] = useState([]);
  //   const [proxyRoute, setProxyRoute] = useState("");
  //   const [selectedServerFiles, setSelectedServerFiles] = useState([]);
  //   const [automated, setAutomated] = useState([]);
  //   const [trigger, setTrigger] = useState(0);
  //   const [selectPostAction, setSelectPostAction] = useState({});
  //   const [modalFileIsOpen, setModalFileIsOpen] = useState(false);

  //   const idField = schema.idField;
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
  //   const fileFieldNameScrollPaging =
  //     serverSchema.dashboardFormSchemaParameters.find(
  //       (field) => field.parameterType === "image",
  //     )?.parameterField;
  //   //here
  //   const RefreshFiles = () => {
  //     setTrigger((prevTrigger) => prevTrigger + 1); // Increment trigger
  //   };
  //   const [selectedFilesContext, setSelectedFilesContext] = useState([]);
  //   const [open, setOpen] = useState(false);
  //   const schemaWithoutID = schema.dashboardFormSchemaParameters.filter(
  //     (schema) => !schema.isIDField,
  //   );
  //   // const { getActionSchema, postActionSchema, deleteActionSchema } =
  //   //   GetActionsFromSchema(schema);
  //   // const {
  //   //   getAction: getActionSchema,
  //   //   postAction: postActionSchema,
  //   //   deleteAction: deleteActionSchema,
  //   // } = GetActionsFromSchema(schema);
  //   const {
  //     getAction: getActionServerSchema,
  //     postAction: postActionServerSchema,
  //     deleteAction: deleteActionServerSchema,
  //   } = GetActionsFromSchema(serverSchema);
  //   const isSubset = IsSecondListSubsetOfFirstList(
  //     parentSchemaParameters,
  //     schemaWithoutID,
  //     ["parameterField"],
  //   );

  //   function handleUpload(postAction, containerSelectedFiles, route) {
  //     setSelectPostAction(postAction);
  //     if (containerSelectedFiles.length > 0) {
  //       setSelectedFilesContext(containerSelectedFiles);
  //       setProxyRoute(route);
  //     }
  //     setOpen(!isSubset);
  //     setAutomated(isSubset);
  //     setSelectedFiles([]);
  //     setSelectedServerFiles([]);
  //   }
  //   function handleDelete(postAction, containerSelectedFiles, route) {
  //     setSelectPostAction(postAction);
  //     if (containerSelectedFiles.length > 0) {
  //       setSelectedFilesContext(containerSelectedFiles);
  //       setProxyRoute(route);
  //     }
  //     setOpen(!isSubset);
  //     setAutomated(isSubset);
  //     setSelectedFiles([]);
  //     setSelectedServerFiles([]);
  //   }
  //   // subset checking
  //   const {
  //     getAction: getActionSchema,
  //     postAction: postActionSchema,
  //     deleteAction: deleteActionSchema,
  //     isLoading,
  //   } = GetActionsFromSchema(schema);
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
