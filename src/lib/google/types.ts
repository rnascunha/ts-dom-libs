import { Dispatch, SetStateAction } from "react";

export interface GoogleAPIState {
  api: boolean;
  gsi: boolean;
  signed: boolean;
}

export type SetGoogleAPIState<T extends GoogleAPIState = GoogleAPIState> = Dispatch<SetStateAction<T>>;


export type GapiClientDriveFilesListArgs = Exclude<
  Parameters<typeof gapi.client.drive.files.list>[0],
  undefined
>;
export type GapiClientDriveFilesGetArgs = Exclude<
  Parameters<typeof gapi.client.drive.files.get>[0],
  undefined
>;

export type DriveSpaces = "drive" | "appDataFolder";