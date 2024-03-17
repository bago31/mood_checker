import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {Moods} from "../enums/moods";

export interface Mood {
  date: string;
  userId: string;
  mood_organization: Moods,
  mood_team: Moods,
  mood_yourself: Moods

}
