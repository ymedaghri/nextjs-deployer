import { NextResponse } from "next/server";
import { db } from '@/lib/db';

export async function GET() {
    return NextResponse.json(db.data.repositories);
}

export async function POST(req: Request) {
    const { name, description, cloneUrl } = await req.json();
    
    const newRepository = { name, description, clone_url:cloneUrl };
    db.data.repositories.push(newRepository);
  
    await db.write();
  
    return NextResponse.json(newRepository, { status: 201 });
}