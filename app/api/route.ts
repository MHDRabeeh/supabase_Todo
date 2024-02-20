import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
//read
export async function GET(request: Request, response: Response) {
  const profile = await prisma.profile.findMany();
  return new Response(JSON.stringify(profile));
}

//create new todo

export async function POST(request: Request) {
  try {
    const { todo } = await request.json();

    const profile = await prisma.profile.create({
      data: {
        todo: todo,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
  }
}

// Updating todo

export async function PUT(request: Request) {
  try {
    const { id, value } = await request.json();
    const profile = await prisma.profile.update({
      where: { id: id },
      data: { todo: value },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request, Context: any) {
  try {
    const { id } = await request.json();

    const profile = await prisma.profile.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
  }
}
