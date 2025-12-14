import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Shop } from '@/types';

interface MapContentProps {
  shops: Shop[];
}

export const MapContent = ({ shops }: MapContentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [19.4, -99.12],
      zoom: 12,
      zoomControl: true,
      attributionControl: false,
    });

    mapInstance.current = map;

    // Add dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Add shop markers
    shops.forEach((shop) => {
      const markerIcon = L.icon({
        iconUrl: `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40" fill="none"><path d="M16 0C9.4 0 4 5.4 4 12c0 8 12 28 12 28s12-20 12-28c0-6.6-5.4-12-12-12z" fill="%23e5e7eb" stroke="%231a1a1a" stroke-width="1"/><circle cx="16" cy="12" r="5" fill="%231a1a1a"/></svg>`,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([shop.lat, shop.lng], { icon: markerIcon }).addTo(map);

      const popupContent = `
        <div class="min-w-48 p-2">
          <h4 class="font-semibold text-sm mb-1 text-neutral-900">${shop.name}</h4>
          <p class="text-xs text-neutral-600 mb-2">${shop.category}</p>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-neutral-700">⭐ ${shop.rating}</span>
            <span class="text-xs text-neutral-700">📍 ${shop.distance}</span>
          </div>
          ${shop.promo ? `<div class="rounded px-2 py-1 mb-2" style="background-color: hsl(var(--primary) / 0.1)"><p class="text-xs font-medium" style="color: hsl(var(--primary))">${shop.promo}</p></div>` : ''}
          <button class="w-full bg-neutral-900 text-white text-xs py-1.5 rounded font-medium hover:bg-neutral-800 transition-colors">
            Ver detalles
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
    });

    // Request user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Add user location marker
          const userMarkerIcon = L.icon({
            iconUrl: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="%23a855f7" stroke="%23fff" stroke-width="2"/><circle cx="16" cy="16" r="6" fill="%23fff"/></svg>',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
          });

          L.marker([userLat, userLng], { icon: userMarkerIcon })
            .addTo(map)
            .bindPopup('Tu ubicación');

          // Center map on user location
          map.flyTo([userLat, userLng], 14);
        },
        () => {
          // Location error - map will use default center
        }
      );
    }

    // Cleanup function
    const cleanup = () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };

    return cleanup;
  }, [shops]);

  return <div ref={mapRef} className="w-full h-full" />;
};
