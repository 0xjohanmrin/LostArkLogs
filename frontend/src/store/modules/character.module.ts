import { Session } from "@/interfaces/session.interface";
import axios from "axios";
import { Module } from "vuex";

/**
 * Module containing characters related functions and variables.
 */
export const character: Module<any, any> = {
  state: {
    characters: [],
    selectedCharacter: {},
  },
  mutations: {
    setCharacters(state, characters: any) {
      console.log(characters);
      state.characters = characters;
    },
    setSelectedCharacter(state, character: any) {
      state.selectedCharacter = character;
    },
  },
  getters: {
    characters(state) {
      return state.characters;
    },
    selectedCharacter(state) {
      return state.selectedCharacter;
    },
  },
  actions: {
    uploadCharacters({ getters }, character: any) {
      return new Promise((resolve, reject) => {
        const key = getters.uploadToken;
        const request = {
          method: "POST",
          url: `${getters.apiUrl}/character/create`,
          withCredentials: true,
          data: { character, key: key },
          headers: {
            "Content-Type": "application/json",
          },
        };

        axios(request)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            console.error(err);
            reject(new Error(`Failed getting sessions`));
          });
      });
    },
    async getCharactersbyAuthorId({ getters, commit }) {
      const key = getters.uploadToken;
      const request = {
        method: "GET",
        url: `${getters.apiUrl}/character/get`,
        withCredentials: true,
        params: { key: key },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(request);
      commit("setCharacters", response.data.data);
    },
    setSelectedCharacter({ commit }, character: any) {
      commit("setSelectedCharacter", character);
    },
  },
};
