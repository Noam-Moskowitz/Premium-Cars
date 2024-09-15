import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ message: `User not authorized!` });

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(400).send(err.message);

    next();
  });
};

export const checkIfAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ message: `User not authorized!` });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).send(err.message);

    if (!decoded.isAdmin) return res.status(401).send({ message: `User not authorized!` });

    next();
  });
};

export const checkIfUserOrAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  if (!token) return res.status(401).send({ message: `User not authorized!` });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err.message);

    if (decoded.isAdmin || id === decoded._id) {
      return next();
    }

    return res.status(401).send({ message: `User not authorized!` });
  });
};
