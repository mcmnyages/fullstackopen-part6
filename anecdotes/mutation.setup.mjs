import { vi } from "vitest"

vi.mock("zustand", async (importOriginal) => {
  const actual = await importOriginal()
  const noop = () => {}
  const disableSet = (creator) => (_set, get, api) => creator(noop, get, api)
  const create = (creator) =>
    typeof creator === "function"
      ? actual.create(disableSet(creator))
      : (innerCreator) => actual.create(disableSet(innerCreator))
  return { ...actual, create }
})
