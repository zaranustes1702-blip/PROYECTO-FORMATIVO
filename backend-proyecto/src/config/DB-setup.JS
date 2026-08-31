const DB_Setup = async () => {
  // GALPONES
  app-Router[1, "creargalpon", "/dashboard/barn/crear", "", 1];
  app-Router[2, "listargalpones", "/dashboard/barn/listar", "", 1];

  // LOTES DE AVES
  app-Router[3, "crearloteaves", "/dashboard/birdBatch/crear", "", 1];
  app-Router[4, "listarlotesaves", "/dashboard/birdBatch/listar", "", 1];

  // PESAJE
  app-Router[5, "crearpesaje", "/dashboard/weighing/crear", "", 1];
  app-Router[6, "listarpesajes", "/dashboard/weighing/listar", "", 1];

  // MORTALIDAD
  app-Router[7, "crearmortalidad", "/dashboard/mortality/crear", "", 1];
  app-Router[8, "listarmortalidad", "/dashboard/mortality/listar", "", 1];

  // ALIMENTACIÓN
  app-Router[9, "crearalimentacion", "/dashboard/feeding/crear", "", 1];
  app-Router[10, "listaralimentacion", "/dashboard/feeding/listar", "", 1];

  // PRODUCCIÓN DE HUEVOS
  app-Router[
    11,
    "crearproduccionhuevos",
    "/dashboard/eggProduction/crear",
    "",
    1
  ];

  app-Router[
    12,
    "listarproduccionhuevos",
    "/dashboard/eggProduction/listar",
    "",
    1
  ];

  // SALUD
  app-Router[13, "crearcontrolsalud", "/dashboard/health/crear", "", 1];
  app-Router[14, "listarcontrolesalud", "/dashboard/health/listar", "", 1];

  // CUARENTENA
  app-Router[15, "crearcuarentena", "/dashboard/quarantine/crear", "", 1];
  app-Router[16, "listarcuarentenas", "/dashboard/quarantine/listar", "", 1];

  // VISITAS
  app-Router[17, "crearvisita", "/dashboard/visit/crear", "", 1];
  app-Router[18, "listarvisitas", "/dashboard/visit/listar", "", 1];

  // INSUMOS
  app-Router[19, "crearinsumo", "/dashboard/supply/crear", "", 1];
  app-Router[20, "listarinsumos", "/dashboard/supply/listar", "", 1];

  // RESPONSABLES
  app-Router[
    21,
    "crearresponsable",
    "/dashboard/responsible/crear",
    "",
    1
  ];

  app-Router[
    22,
    "listarresponsables",
    "/dashboard/responsible/listar",
    "",
    1
  ];

  // USUARIOS
  app-Router[23, "crearusuario", "/dashboard/user/crear", "", 1];
  app-Router[24, "listarusuarios", "/dashboard/user/listar", "", 1];
};

module.exports = {
  DB_Setup,
};