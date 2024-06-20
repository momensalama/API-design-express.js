import prisma from "../db";

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: id,
      belongsTo: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToID: req.user.id,
    },
  });

  res.json({ data: product });
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.update({
    where: {
      id_belongsToID: {
        id: req.params.id,
        belongsToID: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
};

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToID: {
        id: req.params.id,
        belongsToID: req.user.id,
      },
    },
  });

  res.json({ data: deleted });
};
