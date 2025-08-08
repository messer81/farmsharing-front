import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { GoogleMap, InfoWindowF as InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Link as RouterLink } from 'react-router-dom';
import { useGetFarmsByBoundsQuery } from '../../../entities/farm/model/rtkApi';
import type { Farm } from '../../../types/api';
import { useTranslation } from 'react-i18next';

type MapBounds = { n: number; s: number; e: number; w: number } | undefined;

const DEFAULT_CENTER = { lat: 31.9522, lng: 35.2332 }; // Центр по умолчанию (можно скорректировать позднее)
const DEFAULT_ZOOM = 8;

// ВАЖНО: держим список библиотек за пределами компонента,
// чтобы не вызывать повторную подгрузку скрипта
const MAP_LIBRARIES = ['marker'] as const;

export const FarmMap: React.FC = () => {
  const { t } = useTranslation();
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const mapId = (import.meta as any).env?.VITE_GOOGLE_MAPS_MAP_ID as string | undefined;

  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: apiKey || '', libraries: MAP_LIBRARIES as any });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = React.useState<MapBounds>(undefined);
  const [activeFarmId, setActiveFarmId] = React.useState<number | null>(null);
  const markersRef = React.useRef<Map<number, google.maps.marker.AdvancedMarkerElement>>(new Map());

  // Обновляем границы после остановки интеракции с картой
  const handleIdle = React.useCallback(() => {
    if (!map) return;
    const b = map.getBounds();
    if (!b) return;
    const ne = b.getNorthEast();
    const sw = b.getSouthWest();
    setBounds({ n: ne.lat(), s: sw.lat(), e: ne.lng(), w: sw.lng() });
  }, [map]);

  const { data: farms, isFetching, isError } = useGetFarmsByBoundsQuery(
    bounds ? { n: bounds.n, s: bounds.s, e: bounds.e, w: bounds.w } : ({} as any),
    { skip: !bounds }
  );

  // Универсальная нормализация ответа в массив ферм
  const farmList = React.useMemo<Farm[]>(() => {
    if (!farms) return [];
    if (Array.isArray(farms)) return farms as Farm[];
    const anyRes: any = farms as any;
    if (Array.isArray(anyRes.items)) return anyRes.items as Farm[];
    if (Array.isArray(anyRes.data)) return anyRes.data as Farm[];
    if (Array.isArray(anyRes.results)) return anyRes.results as Farm[];
    return [];
  }, [farms]);

  const onLoad = React.useCallback((m: google.maps.Map) => {
    setMap(m);
    // Первичное чтение границ после инициализации
    window.setTimeout(() => handleIdle(), 0);
  }, [handleIdle]);

  // Создаем/обновляем Advanced Markers при изменении данных
  React.useEffect(() => {
    if (!map || !isLoaded) return;
    // Очистка старых
    markersRef.current.forEach((marker) => (marker.map = null as any));
    markersRef.current.clear();

    farmList
      .filter((f) => typeof f.latitude === 'number' && typeof f.longitude === 'number')
      .forEach((f) => {
        const marker = new (google.maps as any).marker.AdvancedMarkerElement({
          map,
          position: { lat: f.latitude as number, lng: f.longitude as number },
          title: typeof f.name === 'object' ? (f.name.ru || f.name.en) : String(f.name),
        });
        // Поддержка клика
        marker.addListener?.('gmp-click', () => setActiveFarmId(f.id));
        marker.addListener?.('click', () => setActiveFarmId(f.id));
        markersRef.current.set(f.id, marker);
      });

    return () => {
      markersRef.current.forEach((marker) => (marker.map = null as any));
      markersRef.current.clear();
    };
  }, [map, isLoaded, farmList]);

  return (
    <Box sx={{ width: '100%', my: { xs: 2, md: 4 } }}>
      <Typography variant={"sectionTitle" as any}>{t('map.title')}</Typography>

      {!apiKey ? (
        <Typography color="error" textAlign="center">
          {t('map.missingApiKey')}
        </Typography>
      ) : !isLoaded ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: { xs: 360, md: 420 }, width: '100%' }}>
          <GoogleMap
            onLoad={onLoad}
            onIdle={handleIdle}
            onClick={() => setActiveFarmId(null)}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            options={{ mapId, fullscreenControl: false, streetViewControl: false }}
          >
            {activeFarmId != null && (() => {
              const f = farmList.find((x) => x.id === activeFarmId);
              if (!f || !f.latitude || !f.longitude) return null;
              return (
                <InfoWindow position={{ lat: f.latitude as number, lng: f.longitude as number }} onCloseClick={() => setActiveFarmId(null)}>
                  <Box sx={{ p: 0.5, minWidth: 220 }}>
                    {f.image && (
                      <Box sx={{ mb: 1, borderRadius: 1, overflow: 'hidden' }}>
                        <img
                          src={f.image}
                          alt={t('map.farmImageAlt', { name: typeof f.name === 'object' ? (f.name.ru || f.name.en) : String(f.name) })}
                          style={{ width: '100%', height: 120, objectFit: 'cover' }}
                        />
                      </Box>
                    )}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {typeof f.name === 'object' ? (f.name.ru || f.name.en) : String(f.name)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      📍 {f.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      ⭐ {f.rating}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Button
                        component={RouterLink}
                        to={`/farm/${f.id}`}
                        variant="contained"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('map.openFarm')}
                      </Button>
                    </Box>
                  </Box>
                </InfoWindow>
              );
            })()}
          </GoogleMap>
        </Box>
      )}

      {isError && (
        <Typography color="error" textAlign="center" sx={{ mt: 1 }}>
          {t('map.loadError')}
        </Typography>
      )}

      {isFetching && isLoaded && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={22} />
        </Box>
      )}
    </Box>
  );
};

export default FarmMap;


