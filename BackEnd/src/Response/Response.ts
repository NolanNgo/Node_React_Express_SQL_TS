import express, { Request, Response } from "express";

export interface Json {
    code: number;
    data: Object;
    message: String
    AccessToken? : String
}

type Promise<T = Response> = (body?: Json) => T;

export interface CustomResponse extends Response {
    json: Promise<this>;
}


 