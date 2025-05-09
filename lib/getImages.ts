import prisma from "@/lib/prisma";

export const getImages = async () => {
  try {
    const images = await prisma.images.findMany({
      select: {
        imageUrl: true,
        prompt: true,
        user: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
