import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState, useRef } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import Globe from "react-globe.gl"; // For the 3D Earth
import { motion, AnimatePresence } from "framer-motion"; // For smooth transition
import { LanguageContext } from "../context/Language";
import { locationMap } from "./style";
import PolygonForm from "./PolygonForm";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationMap = () => {
  const { localization } = useContext(LanguageContext);
  const [showGlobe, setShowGlobe] = useState(true);
  const globeRef = useRef();

  // URL PARAMS (Existing logic)
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
  const [lat, setLat] = useState(+location[latitudeField] || 30.0444); // Cairo default
  const [lng, setLng] = useState(+location[longitudeField] || 31.2357);

  // -------------------------
  // Intro Logic: Switch from Globe to Map
  // -------------------------
  useEffect(() => {
    // 1. Point globe to target location
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat, lng, altitude: 2.5 }, 0);
      // 2. Start "Zooming in" animation
      setTimeout(() => {
        globeRef.current.pointOfView({ lat, lng, altitude: 0.5 }, 2000);
      }, 500);
    }

    // 3. Switch to Leaflet after 2.5 seconds
    const timer = setTimeout(() => {
      setShowGlobe(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, [lat, lng]);

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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <AnimatePresence>
        {showGlobe ? (
          <motion.div
            key="globe"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2 }} // Zoom effect on exit
            transition={{ duration: 0.8, ease: "easeIn" }}
            style={{
              position: "absolute",
              zIndex: 10,
              width: "100%",
              height: "100%",
            }}
          >
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              width={window.innerWidth}
              height={500}
              // backgroundColor="rgba(0,0,0,0)"
            />
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={locationMap.container}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationMap;
