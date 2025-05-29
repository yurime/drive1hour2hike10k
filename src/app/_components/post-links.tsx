import Link from "next/link";

export function PostLinks(
  {gpxFileAddr, wazeParking, israelHikingMap}:{gpxFileAddr:string, wazeParking:string, israelHikingMap:string}) {
  return (
    <>
      <Link 
          href={gpxFileAddr} 
          className="hover:underline">
           <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             Download gpx 
           </button>
      </Link>
       <Link 
          href={wazeParking} 
          className="hover:underline">
           <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             Waze To Parking 
           </button>
      </Link>
       <Link 
          href={israelHikingMap} 
          className="hover:underline">
           <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
             Route on IsraelHikingMap 
           </button>
      </Link>
              <Link 
                       href={'https://amudanan.co.il/?url='  + gpxFileAddr}
                       className="hover:underline">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          Route on Amudanan 
                        </button>
                   </Link>
    </>
  );
};
