const cleanId = (id: string) =>
  id.replace(/\/index$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

export default cleanId;
