import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function deleteModule(moduleId) {
    const { modules = [] } = db;
    const before = modules.length;
    db.modules = modules.filter((module) => module._id !== moduleId);
    const after = db.modules.length;
    return { deleted: after < before };
  }

  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...(db.modules || []), newModule];
    return newModule;
  }

  function findModulesForCourse(courseId) {
    const { modules = [] } = db;
    return modules.filter((m) => m.course === courseId);
  }

  function updateModule(moduleId, moduleUpdates) {
    const { modules = [] } = db;
    const module = modules.find((m) => m._id === moduleId);
    if (!module) return null;
    Object.assign(module, moduleUpdates);
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
