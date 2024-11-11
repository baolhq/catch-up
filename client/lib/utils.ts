import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NextResponse } from 'next/server';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}

export function generateFileName(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0'); 
  const dd = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);

  return `${yyyy}${MM}${dd}${HH}${ss}${randomDigits}`;
}


export function getPhotoLh3UrlById(id: string, size: number = 2200) {
  return `https://lh3.googleusercontent.com/d/${id}=s${size}?authuser=0`;
}

interface BaseResponse {
  statusCode: number;
  Data: any;
  Message: string;
  totalRecords: number;
}

const createBaseResponse = (
    statusCode: number = 200,
    responseObject: any,
    totalRecords: number | 1,
    isOnlyOnce: boolean = false
): NextResponse | undefined => {

  let data: BaseResponse = {
    statusCode: statusCode,
    Data: responseObject,
    Message: "Bad Request",
    totalRecords: totalRecords
  };

  if (totalRecords < 0 || statusCode < 200 || statusCode > 299 || typeof responseObject !== 'object') {
    return new NextResponse(JSON.stringify(data), {
      status: statusCode,
    })
  }

  if (statusCode >= 200 && statusCode <= 299) {
    if (totalRecords == 0) {
      data.Message = "No records found";
      data.statusCode = 404;
    }

    if (isOnlyOnce) {
      data.Data = getValueFromObject(responseObject)[0];
      data.Message = getMessageFromHTTPSCode(statusCode);
    }
    else {
      data.Data = getValueFromObject(responseObject);
      data.Message = getMessageFromHTTPSCode(statusCode);
    }

    if(data.totalRecords > 0 && data.Data === null) {
      data.Message = "Contact IT for help, this method was not implemented correctly";
      data.totalRecords = -1;
      data.statusCode = -1;
    }

    return new NextResponse(JSON.stringify(data), {
      status: statusCode,
    });
  }


  data.Message = "Contact IT for help, this method was not implemented correctly";
  data.totalRecords = -1;
  data.statusCode = -1;

  return new NextResponse(JSON.stringify(data), {
    status: 500,
  });
};

const createBaseCatchError = (
    error: any
): NextResponse => {
  let data: BaseResponse = {
    statusCode: 500,
    Data: null,
    Message: "Internal Server Error",
    totalRecords: 0
  };

  if (error instanceof Error) {
    data.Message = error.message;
  }

  return new NextResponse(JSON.stringify(data), {
    status: 500,
  });
}


// Helper functions

function getValueFromObject(responseObject: any): any | null {
  responseObject = { responseObject };
  if (typeof responseObject === 'object') {
    const keys = Object.keys(responseObject);

    if (keys.length > 0 && Array.isArray(responseObject[keys[0]])) {
      const firstArray = responseObject[keys[0]];

      if (firstArray.length > 0) {
        return firstArray;
      }
    }

    if (keys.length > 0 && typeof responseObject[keys[0]] === 'object') {
      return responseObject[keys[0]];
    }
  }
  return null;
}

function getMessageFromHTTPSCode(httpStatusCode: number): string {
  const statusMessageMap: { [key: number]: string } = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
  };

  if (httpStatusCode >= 200 && httpStatusCode <= 299) {
    return statusMessageMap[httpStatusCode] || "Unknown Success Status";
  } else {
    return "Bad Request";
  }
}

export {createBaseResponse, createBaseCatchError};