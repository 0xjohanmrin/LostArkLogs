import { Module } from "vuex";
import { NODE_ENV, API_HOST, DISCORD_REDIRECT } from "@/config/index";
console.log("API_HOST", API_HOST);
console.log(process.env.BASE_URL);
/**
 * Module containing environment related functions and variables.
 */
export const env: Module<any, any> = {
  state: () => ({
    logLevel:
      localStorage.getItem("loglevel") ||
      (NODE_ENV === "development" ? "debug" : "none"),
    apiUrl: API_HOST,
    authUrl: DISCORD_REDIRECT,
  }),
  mutations: {
    setLogLevel(state, value: string) {
      state.logLevel = value;
      localStorage.setItem("loglevel", value);
    },
  },
  getters: {
    logLevel: (state) => state.logLevel,
    apiUrl: (state) => state.apiUrl,
    authUrl: (state) => state.authUrl,
  },
};
