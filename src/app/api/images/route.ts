// Code By Raja Majumdar https://github.com/r3yc0n1c/next-gphoto
import { NextRequest, NextResponse } from 'next/server';
import { getPhoto } from '@/services/gphoto.service';

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get('url') || ""
    //console.log(`Trying... ${url}`);
    const imageURLs = await getPhoto(url)
    return NextResponse.json(imageURLs, {status: 200});
}