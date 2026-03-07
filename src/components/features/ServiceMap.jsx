import React, { useEffect, useRef } from 'react';
import './ServiceMap.css';

const ServiceMap = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        // Only initialize once
        if (mapInstance.current) return;

        // Use global L from CDN (index.html)
        if (typeof window.L === 'undefined') {
            console.error('Leaflet not loaded from CDN');
            return;
        }

        const L = window.L;

        // Central Lagos/Business District as center
        const center = [6.4549, 3.4246]; // Example: Ikoyi/Victoria Island area

        mapInstance.current = L.map(mapRef.current, {
            center: center,
            zoom: 12,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance.current);

        // Core Service Areas
        const areas = [
            { name: "Victoria Island", coords: [6.43, 3.42], status: "Active" },
            { name: "Ikoyi", coords: [6.45, 3.44], status: "Active" },
            { name: "Lekki Phase 1", coords: [6.44, 3.48], status: "Active" },
            { name: "Ikeja", coords: [6.60, 3.34], status: "Active" },
            { name: "Magodo", coords: [6.62, 3.39], status: "Coming Soon" }
        ];

        areas.forEach(area => {
            const marker = L.circle(area.coords, {
                color: area.status === 'Active' ? '#6366f1' : '#cbd5e1',
                fillColor: area.status === 'Active' ? '#6366f1' : '#cbd5e1',
                fillOpacity: 0.2,
                radius: 1500
            }).addTo(mapInstance.current);

            marker.bindPopup(`<b>${area.name}</b><br>Service Status: ${area.status}`);
        });

    }, []);

    return (
        <div className="service-map-container mt-12 mb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <span className="badge badge-secondary mb-4">Coverage Areas</span>
                    <h2 className="text-4xl font-bold mb-4">Where We Shine</h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Sapphire Sparks currently dominates the major hubs in Lagos.
                        Check if your neighborhood is within our prime service pulse.
                    </p>
                </div>

                <div className="glass-panel overflow-hidden relative shadow-2xl p-0 h-[500px] border-none group">
                    <div ref={mapRef} className="h-full w-full z-10" />
                    <div className="absolute bottom-6 left-6 z-20 glass-panel p-4 flex flex-col gap-2 pointer-events-none">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                            Active Service Pulse
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                            <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                            Expansion Pending
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceMap;
