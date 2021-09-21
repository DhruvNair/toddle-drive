import Entity from "./models/Entity";

export const initialEntities: Entity[] = [
  new Entity("My Documents", "folder", ""),
  new Entity("Training", "folder", "/My Documents"),
  new Entity("New hire onboarding", "folder", "/My Documents/Training"),
  new Entity("Leadership skills", "folder", "/My Documents/Training"),
  new Entity("Soft skills in a workplace", "folder", "/My Documents/Training"),
  new Entity("Mixpanel introduction", "folder", "/My Documents/Training"),
  new Entity("Training schedule.doc", "file", "/My Documents/Training"),
  new Entity("Day 1", "folder", "/My Documents/Training/New hire onboarding"),
  new Entity("Day 2", "folder", "/My Documents/Training/New hire onboarding"),
  new Entity("Day 3", "folder", "/My Documents/Training/New hire onboarding"),
  new Entity(
    "About Toddle-2.ppt",
    "file",
    "/My Documents/Training/New hire onboarding"
  ),
  new Entity(
    "Registration form.pdf",
    "file",
    "/My Documents/Training/New hire onboarding"
  ),
  new Entity(
    "Required document list.pdf",
    "file",
    "/My Documents/Training/New hire onboarding"
  ),
  new Entity(
    "About Toddle.ppt",
    "file",
    "/My Documents/Training/New hire onboarding"
  ),
];
