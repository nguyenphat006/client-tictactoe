export interface ErrorResponse {
    message: Array<{
      message: string
      path: string
    }>
    error: string;
    statusCode: number;
  }

  export interface ErrorResponse2 {
    message: Array<{
      field: string
      error: string
    }>
    error: string;
    statusCode: number;
  }