export class HttpStatus {
  static readonly ACCEPTED = 202;
  static readonly BAD_GATEWAY = 502;
  static readonly BAD_REQUEST = 400;
  static readonly CONFLICT = 409;
  static readonly CONTINUE = 100;
  static readonly CREATED = 201;
  static readonly EXPECTATION_FAILED = 417;
  static readonly FAILED_DEPENDENCY = 424;
  static readonly FORBIDDEN = 403;
  static readonly GATEWAY_TIMEOUT = 504;
  static readonly GONE = 410;
  static readonly HTTP_VERSION_NOT_SUPPORTED = 505;
  static readonly IM_A_TEAPOT = 418;
  static readonly INSUFFICIENT_SPACE_ON_RESOURCE = 419;
  static readonly INSUFFICIENT_STORAGE = 507;
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly LENGTH_REQUIRED = 411;
  static readonly LOCKED = 423;
  static readonly METHOD_FAILURE = 420;
  static readonly METHOD_NOT_ALLOWED = 405;
  static readonly MOVED_PERMANENTLY = 301;
  static readonly MOVED_TEMPORARILY = 302;
  static readonly MULTI_STATUS = 207;
  static readonly MULTIPLE_CHOICES = 300;
  static readonly NETWORK_AUTHENTICATION_REQUIRED = 511;
  static readonly NO_CONTENT = 204;
  static readonly NON_AUTHORITATIVE_INFORMATION = 203;
  static readonly NOT_ACCEPTABLE = 406;
  static readonly NOT_FOUND = 404;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly NOT_MODIFIED = 304;
  static readonly OK = 200;
  static readonly PARTIAL_CONTENT = 206;
  static readonly PAYMENT_REQUIRED = 402;
  static readonly PERMANENT_REDIRECT = 308;
  static readonly PRECONDITION_FAILED = 412;
  static readonly PRECONDITION_REQUIRED = 428;
  static readonly PROCESSING = 102;
  static readonly EARLY_HINTS = 103;
  static readonly UPGRADE_REQUIRED = 426;
  static readonly PROXY_AUTHENTICATION_REQUIRED = 407;
  static readonly REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
  static readonly REQUEST_TIMEOUT = 408;
  static readonly REQUEST_TOO_LONG = 413;
  static readonly REQUEST_URI_TOO_LONG = 414;
  static readonly REQUESTED_RANGE_NOT_SATISFIABLE = 416;
  static readonly RESET_CONTENT = 205;
  static readonly SEE_OTHER = 303;
  static readonly SERVICE_UNAVAILABLE = 503;
  static readonly SWITCHING_PROTOCOLS = 101;
  static readonly TEMPORARY_REDIRECT = 307;
  static readonly TOO_MANY_REQUESTS = 429;
  static readonly UNAUTHORIZED = 401;
  static readonly UNAVAILABLE_FOR_LEGAL_REASONS = 451;
  static readonly UNPROCESSABLE_ENTITY = 422;
  static readonly UNSUPPORTED_MEDIA_TYPE = 415;
  static readonly USE_PROXY = 305;
  static readonly MISDIRECTED_REQUEST = 421;

  static readonly REASON_PHRASES: { [code: number]: string } = {
    202: "Accepted",
    502: "Bad Gateway",
    400: "Bad Request",
    409: "Conflict",
    100: "Continue",
    201: "Created",
    417: "Expectation Failed",
    424: "Failed Dependency",
    403: "Forbidden",
    504: "Gateway Timeout",
    410: "Gone",
    505: "HTTP Version Not Supported",
    418: "I'm a teapot",
    419: "Insufficient Space on Resource",
    507: "Insufficient Storage",
    500: "Internal Server Error",
    411: "Length Required",
    423: "Locked",
    420: "Method Failure",
    405: "Method Not Allowed",
    301: "Moved Permanently",
    302: "Moved Temporarily",
    207: "Multi-Status",
    300: "Multiple Choices",
    511: "Network Authentication Required",
    204: "No Content",
    203: "Non Authoritative Information",
    406: "Not Acceptable",
    404: "Not Found",
    501: "Not Implemented",
    304: "Not Modified",
    200: "OK",
    206: "Partial Content",
    402: "Payment Required",
    308: "Permanent Redirect",
    412: "Precondition Failed",
    428: "Precondition Required",
    102: "Processing",
    103: "Early Hints",
    426: "Upgrade Required",
    407: "Proxy Authentication Required",
    431: "Request Header Fields Too Large",
    408: "Request Timeout",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    416: "Requested Range Not Satisfiable",
    205: "Reset Content",
    303: "See Other",
    503: "Service Unavailable",
    101: "Switching Protocols",
    307: "Temporary Redirect",
    429: "Too Many Requests",
    401: "Unauthorized",
    451: "Unavailable For Legal Reasons",
    422: "Unprocessable Entity",
    415: "Unsupported Media Type",
    305: "Use Proxy",
    421: "Misdirected Request",
  };

  static phrase(code: number): string {
    return HttpStatus.REASON_PHRASES[code] ?? "Unknown Status";
  }
}
