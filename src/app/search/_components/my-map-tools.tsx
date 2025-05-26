import type { Map, LatLng, LatLngBounds, LatLngTuple, LeafletMouseEvent } from 'leaflet'
import { latLngBounds } from 'leaflet';
import { useMap,  
         } from 'react-leaflet'

import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

interface IChangeView {
    center: LatLngTuple;
    markers: LatLngTuple[];
}

const DEFAULT_ZOOM = 13;

export function ChangeView({ center, markers }: IChangeView) {
    const map = useMap();
    map.setView({lng: center[0], lat: center[1]}, DEFAULT_ZOOM);
    
    let markerBounds = latLngBounds([]);
    markers.forEach(marker => {
        markerBounds.extend([marker[0], marker[1]])
    })
    map.fitBounds(markerBounds)   // <===== Error: Bounds are not valid.
    return null;
}


export function CaptureMove({setBounds, map}:{setBounds:(Dispatch<SetStateAction<LatLngBounds|null>>), map:Map}) {
    const onMove = useCallback( () => {
                                setBounds(map.getBounds())
                                        }, [map]
                              )
    const onZoom = useCallback( () => {
                                setBounds(map.getBounds())
                                        }, [map]
                              )
    useEffect(() => {
                    map.on('move', onMove)
                    return () => {
                                  map.off('move', onMove)
                                }
                  }, [map, onMove]
    )
    useEffect(() => {
                    map.on('zoomend', onZoom)
                    return () => {
                                  map.off('zoomend', onZoom)
                                }
                  }, [map, onZoom]
    )
  return null
}

export function CaptureMouse({setMouseCoord, map}:{setMouseCoord:(Dispatch<SetStateAction<LatLng|null>>), map:Map}) {
    const onMouseMove = useCallback( (event: LeafletMouseEvent) => {
                                setMouseCoord(map.mouseEventToLatLng( event.originalEvent))
                                        }, [map]
                              )
    
    useEffect(() => {
                    map.on('mousemove', onMouseMove)
                    return () => {
                                  map.off('mousemove', onMouseMove)
                                }
                  }, [map, onMouseMove]
    )
  return null
}

