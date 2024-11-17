import { NextResponse } from "next/server";
import { db } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { name: string } }) {
    db.data.repositories = db.data.repositories.filter((repository) => repository.name !== params.name);
    
    await db.write();

    return NextResponse.json({ message: `Repository ${params.name} deleted.` });
}