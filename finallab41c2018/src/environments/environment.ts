// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: "http://localhost/lab4/api",
  // apiURL: "http://pablovalenzuela.esy.es/lab4/api",
  availablePageSizes:[5,15,30,50],
  apiViajes:"/viaje/",
  apiVehiculos:"/vehiculo/",
  apiUsuario:"/usuario/",
  apiEmpleado: "/empleado/",
  apiPDF: "/fpdf/getPDF.php"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
