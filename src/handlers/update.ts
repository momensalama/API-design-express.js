import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToID: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.flatMap((product) => product.updates);

  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // TODO
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      status: "IN_PROGRESS",
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToID: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.flatMap((product) => product.updates);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // TODO
    return res.json({ message: "nope" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToID: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.flatMap((product) => product.updates);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // todo
    return res.json({ message: "nope" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
