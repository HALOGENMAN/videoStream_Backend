export const pathNotFound = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Path not found', 
  });
}