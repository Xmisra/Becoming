import api from "./api";

export function getJourneys() {
  return api.get("/journey");
}

export function createJourney(formData) {
  return api.post("/journey", formData);
}

export function getExploreJourneys() {
  return api.get("/journey/explore");
}

export function getJourneyTimeline(id) {
  return api.get(`/journey/${id}`);
}

export function generateJourneyReflection(id) {
  return api.post(`/journey/${id}/reflection`);
}

export function addJourneyVersion(id, formData) {
  return api.post(`/version/${id}`, formData);
}
