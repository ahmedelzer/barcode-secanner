// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useContext, useEffect, useState } from "react";
// import {
//   Circle,
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMapEvents,
// } from "react-leaflet";
// import { LanguageContext } from "../context/Language";
// import PolygonForm from "./PolygonForm";
// import { locationMap } from "./style";
// import { useSearchParams } from "react-router-dom";
// // Fix for Leaflet marker icons not showing correctly
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const LocationMap = ({}) => {
//   const { localization } = useContext(LanguageContext);
//   const [searchParams] = useSearchParams();

//   // Parse JSON params from URL
//   const location = JSON.parse(searchParams.get("location") || "{}");
//   const fields = JSON.parse(searchParams.get("fields") || "[]");
//   const clickable = searchParams.get("clickable") === "true";
//   const haveRadius = searchParams.get("haveRadius") === "true";
//   const findServerContainer = searchParams.get("findServerContainer")
//     ? JSON.parse(searchParams.get("findServerContainer"))
//     : null;
//   const clickAction = searchParams.get("clickAction") || "pin";

//   // Functions cannot come from URL; fallback to no-op
//   const onLocationChange = () => {};
//   const setClickAction = () => {};
//   const latitudeField = fields.find(
//     (param) =>
//       param.parameterType ===
//       (haveRadius ? "areaMapLatitudePoint" : "mapLatitudePoint"),
//   )?.parameterField;

//   const longitudeField = fields.find(
//     (param) =>
//       param.parameterType ===
//       (haveRadius ? "areaMapLongitudePoint" : "mapLongitudePoint"),
//   )?.parameterField;

//   const radiusField = haveRadius
//     ? fields.find((param) => param.parameterType === "areaMapRadius")
//         ?.parameterField
//     : null;

//   const [radius, setRadius] = useState(location[radiusField] || 100);

//   const lat = +location[latitudeField] || 20; // Default latitude
//   const lng = +location[longitudeField] || 24; // Default longitude

//   const MapClickHandler = () => {
//     useMapEvents({
//       async click(e) {
//         const { lat, lng } = e.latlng;
//         // const response = await fetch(
//         //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//         // );

//         // const data = await response.json();

//         // const isoCode = data?.address?.country_code?.toUpperCase(); // EG
//         // const city =
//         //   data?.address?.city ||
//         //   data?.address?.town ||
//         //   data?.address?.village ||
//         //   data?.address?.state;
//         onLocationChange({
//           [latitudeField]: lat,
//           [longitudeField]: lng,
//           ...(radiusField && { [radiusField]: radius }),
//         });
//         window.parent.postMessage(
//           {
//             type: "locationChange",
//             payload: {
//               [latitudeField]: lat,
//               [longitudeField]: lng,
//               ...(radiusField && { [radiusField]: radius }),
//             },
//           },
//           "*", // or restrict origin
//         );
//       },
//     });
//     return null;
//   };

//   const handleRadiusChange = (e) => {
//     setRadius(Number(e.target.value));
//   };

//   useEffect(() => {
//     if (radiusField) {
//       onLocationChange({
//         [latitudeField]: lat,
//         [longitudeField]: lng,
//         [radiusField]: radius,
//       });
//       window.parent.postMessage(
//         {
//           type: "locationChange",
//           payload: {
//             [latitudeField]: lat,
//             [longitudeField]: lng,
//             [radiusField]: radius,
//           },
//         },
//         "*", // or restrict origin
//       );
//     }
//   }, []);
//   useEffect(() => {
//     if (lng && lat) {
//       onLocationChange({
//         [latitudeField]: lat,
//         [longitudeField]: lng,
//         // [radiusField]: radius,
//       });
//       window.parent.postMessage(
//         {
//           type: "locationChange",
//           payload: {
//             [latitudeField]: lat,
//             [longitudeField]: lng,
//             // [radiusField]: radius,
//           },
//         },
//         "*", // or restrict origin
//       );
//     }
//   }, []);
//   return (
//     <div className={locationMap.container}>
//       <MapContainer
//         center={[lat, lng]}
//         zoom={13}
//         className={locationMap.mapContainer}
//         attributionControl={false}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {clickable && clickAction === "pin" && <MapClickHandler />}
//         {findServerContainer && (
//           <PolygonForm
//             schema={findServerContainer}
//             enable={clickAction === "polygon"}
//           />
//         )}
//         {location && (
//           <>
//             <Marker position={[lat, lng]}>
//               <Popup>{localization.inputs.locationMap.popupTitle}</Popup>
//             </Marker>
//             {radiusField && (
//               <Circle
//                 center={[lat, lng]}
//                 radius={radius}
//                 color="var(--main-color2)"
//                 fillColor="var(--main-color2)"
//                 fillOpacity={0.2}
//               />
//             )}
//           </>
//         )}
//       </MapContainer>
//       {clickable && findServerContainer && (
//         <div className="flex gap-2 justify-center">
//           <button
//             type="button"
//             onClick={() => setClickAction("pin")}
//             className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
//               clickAction === "pin" ? "bg-accent text-bg" : "bg-bg text-text"
//             }`}
//           >
//             {localization.inputs.locationMap.pinTap}
//           </button>

//           <button
//             type="button"
//             onClick={() => setClickAction("polygon")}
//             className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
//               clickAction === "polygon"
//                 ? "bg-accent text-bg"
//                 : "bg-bg text-text"
//             }`}
//           >
//             {localization.inputs.locationMap.polygonTap}
//           </button>
//         </div>
//       )}
//       {radiusField && clickable && haveRadius && (
//         <div className={locationMap.radiusContainer}>
//           <label>
//             {localization.inputs.locationMap.radius.replace("{radius}", radius)}
//             <input
//               type="range"
//               min="50"
//               max="1000"
//               step="20"
//               value={radius}
//               onChange={handleRadiusChange}
//               className={locationMap.radiusInput}
//             />
//           </label>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationMap;
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LanguageContext } from "../context/Language";
import { locationMap } from "./style";
import PolygonForm from "./PolygonForm";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationMap = () => {
  const { localization } = useContext(LanguageContext);

  // -------------------------
  // URL PARAMS
  // -------------------------
  const searchParams = new URLSearchParams(window.location.search);
  const location = JSON.parse(searchParams.get("location") || "{}");
  const fields = JSON.parse(searchParams.get("fields") || "[]");
  const clickable = searchParams.get("clickable") === "true";
  const haveRadius = searchParams.get("haveRadius") === "true";
  const findServerContainer = searchParams.get("findServerContainer")
    ? JSON.parse(searchParams.get("findServerContainer"))
    : null;
  const clickAction = searchParams.get("clickAction") || "pin";

  const latitudeField = fields.find(
    (p) =>
      p.parameterType ===
      (haveRadius ? "areaMapLatitudePoint" : "mapLatitudePoint"),
  )?.parameterField;

  const longitudeField = fields.find(
    (p) =>
      p.parameterType ===
      (haveRadius ? "areaMapLongitudePoint" : "mapLongitudePoint"),
  )?.parameterField;

  const radiusField = haveRadius
    ? fields.find((p) => p.parameterType === "areaMapRadius")?.parameterField
    : null;

  const [radius, setRadius] = useState(location[radiusField] || 100);
  const [lat, setLat] = useState(+location[latitudeField] || 30.16768827811798);
  const [lng, setLng] = useState(
    +location[longitudeField] || 31.348134877841108,
  );

  // -------------------------
  // Map click events
  // -------------------------
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLat = e.latlng.lat;
        const newLng = e.latlng.lng;

        setLat(newLat);
        setLng(newLng);

        const payload = {
          [latitudeField]: newLat,
          [longitudeField]: newLng,
          ...(radiusField && { [radiusField]: radius }),
        };

        // Send data to parent (iframe / WebView)
        window.parent.postMessage({ type: "locationChange", payload }, "*");
      },
    });
    return null;
  };

  const handleRadiusChange = (e) => {
    const newRadius = Number(e.target.value);
    setRadius(newRadius);

    const payload = {
      [latitudeField]: lat,
      [longitudeField]: lng,
      ...(radiusField && { [radiusField]: newRadius }),
    };
    window.parent.postMessage({ type: "locationChange", payload }, "*");
  };

  // -------------------------
  // Initial message on load
  // -------------------------
  useEffect(() => {
    const payload = {
      [latitudeField]: lat,
      [longitudeField]: lng,
      ...(radiusField && { [radiusField]: radius }),
    };
    window.parent.postMessage({ type: "locationChange", payload }, "*");
  }, []);

  return (
    <div>
      <div className={locationMap.container}>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          className="w-full block"
          style={{ height: "500px" }} // ✅ MUST have height
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {clickable && clickAction === "pin" && <MapClickHandler />}
          {findServerContainer && (
            <PolygonForm
              schema={findServerContainer}
              enable={clickAction === "polygon"}
              // setNewPolygon={setNewPolygon}
            />
          )}
          {location && (
            <>
              <Marker position={[lat, lng]}>
                <Popup>{localization.inputs.locationMap.popupTitle}</Popup>
              </Marker>
              {radiusField && (
                <Circle
                  center={[lat, lng]}
                  radius={radius}
                  color="var(--main-color2)"
                  fillColor="var(--main-color2)"
                  fillOpacity={0.2}
                />
              )}
            </>
          )}
        </MapContainer>
        {/* {clickable && findServerContainer && (
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => setClickAction("pin")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              clickAction === "pin" ? "bg-accent text-bg" : "bg-bg text-text"
            }`}
          >
            {localization.inputs.locationMap.pinTap}
          </button>

          <button
            type="button"
            onClick={() => setClickAction("polygon")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              clickAction === "polygon"
                ? "bg-accent text-bg"
                : "bg-bg text-text"
            }`}
          >
            {localization.inputs.locationMap.polygonTap}
          </button>
        </div>
      )} */}
        {radiusField && clickable && haveRadius && (
          <div className={locationMap.radiusContainer}>
            <label>
              {localization.inputs.locationMap.radius.replace(
                "{radius}",
                radius,
              )}
              <input
                type="range"
                min="50"
                max="1000"
                step="20"
                value={radius}
                onChange={handleRadiusChange}
                className={locationMap.radiusInput}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
