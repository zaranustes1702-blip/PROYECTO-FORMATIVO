
/**
 * Configuración centralizada de todas las rutas de la API.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000/api";

/* =====================================================
   USUARIOS
===================================================== */

export const API_USER_URL =
  `${API_BASE_URL}/users`;

export const API_USER_ALL_URL =
  `${API_USER_URL}/UserAll`;

export const API_USER_CREATE_URL =
  `${API_USER_URL}/CreateUser`;

export const API_USER_BY_ID_URL = (id: number | string) =>
  `${API_USER_URL}/UserById/${id}`;

export const API_USER_UPDATE_URL = (id: number | string) =>
  `${API_USER_URL}/UpdateUser/${id}`;

export const API_USER_DELETE_URL = (id: number | string) =>
  `${API_USER_URL}/DeleteUser/${id}`;

/* =====================================================
   CUARENTENAS
===================================================== */

export const API_QUARANTINE_URL =
  `${API_BASE_URL}/quarantines`;

export const API_QUARANTINE_ALL_URL =
  `${API_QUARANTINE_URL}/QuarantineAll`;

export const API_QUARANTINE_CREATE_URL =
  `${API_QUARANTINE_URL}/CreateQuarantine`;

export const API_QUARANTINE_BY_ID_URL = (
  id: number | string
) => `${API_QUARANTINE_URL}/Quarantine/${id}`;

export const API_QUARANTINE_UPDATE_URL = (
  id: number | string
) => `${API_QUARANTINE_URL}/UpdateQuarantine/${id}`;

export const API_QUARANTINE_DELETE_URL = (
  id: number | string
) => `${API_QUARANTINE_URL}/DeleteQuarantine/${id}`;

/* =====================================================
   SALUD
===================================================== */

export const API_HEALTH_URL =
  `${API_BASE_URL}/health`;

export const API_HEALTH_ALL_URL =
  `${API_HEALTH_URL}/HealthAll`;

export const API_HEALTH_CREATE_URL =
  `${API_HEALTH_URL}/CreateHealth`;

export const API_HEALTH_BY_ID_URL = (
  id: number | string
) => `${API_HEALTH_URL}/Health/${id}`;

export const API_HEALTH_UPDATE_URL = (
  id: number | string
) => `${API_HEALTH_URL}/UpdateHealth/${id}`;

export const API_HEALTH_DELETE_URL = (
  id: number | string
) => `${API_HEALTH_URL}/DeleteHealth/${id}`;

/* =====================================================
   PESAJES
===================================================== */

export const API_WEIGHING_URL =
  `${API_BASE_URL}/weighings`;

export const API_WEIGHING_ALL_URL =
  `${API_WEIGHING_URL}/WeighingsAll`;

export const API_WEIGHING_CREATE_URL =
  `${API_WEIGHING_URL}/CreateWeighing`;

export const API_WEIGHING_BY_ID_URL = (
  id: number | string
) => `${API_WEIGHING_URL}/Weighing/${id}`;

export const API_WEIGHING_UPDATE_URL = (
  id: number | string
) => `${API_WEIGHING_URL}/UpdateWeighing/${id}`;

export const API_WEIGHING_DELETE_URL = (
  id: number | string
) => `${API_WEIGHING_URL}/DeleteWeighing/${id}`;

/* =====================================================
   VISITAS
===================================================== */

export const API_VISIT_URL =
  `${API_BASE_URL}/visits`;

export const API_VISIT_ALL_URL =
  `${API_VISIT_URL}/VisitAll`;

export const API_VISIT_CREATE_URL =
  `${API_VISIT_URL}/CreateVisit`;

export const API_VISIT_BY_ID_URL = (
  id: number | string
) => `${API_VISIT_URL}/Visit/${id}`;

export const API_VISIT_UPDATE_URL = (
  id: number | string
) => `${API_VISIT_URL}/UpdateVisit/${id}`;

export const API_VISIT_DELETE_URL = (
  id: number | string
) => `${API_VISIT_URL}/DeleteVisit/${id}`;

/* =====================================================
   GALPONES
===================================================== */

export const API_BARN_URL =
  `${API_BASE_URL}/barns`;

export const API_BARN_ALL_URL =
  `${API_BARN_URL}/BarnAll`;

export const API_BARN_CREATE_URL =
  `${API_BARN_URL}/CreateBarn`;

export const API_BARN_BY_ID_URL = (
  id: number | string
) => `${API_BARN_URL}/Barn/${id}`;

export const API_BARN_UPDATE_URL = (
  id: number | string
) => `${API_BARN_URL}/UpdateBarn/${id}`;

export const API_BARN_DELETE_URL = (
  id: number | string
) => `${API_BARN_URL}/DeleteBarn/${id}`;

/* =====================================================
   LOTES DE AVES
===================================================== */

export const API_BIRD_BATCH_URL =
  `${API_BASE_URL}/bird-batches`;

export const API_BIRD_BATCH_ALL_URL =
  `${API_BIRD_BATCH_URL}/BirdBatchAll`;

export const API_BIRD_BATCH_CREATE_URL =
  `${API_BIRD_BATCH_URL}/CreateBirdBatch`;

export const API_BIRD_BATCH_BY_ID_URL = (
  id: number | string
) => `${API_BIRD_BATCH_URL}/BirdBatchById/${id}`;

export const API_BIRD_BATCH_UPDATE_URL = (
  id: number | string
) => `${API_BIRD_BATCH_URL}/UpdateBirdBatch/${id}`;

export const API_BIRD_BATCH_DELETE_URL = (
  id: number | string
) => `${API_BIRD_BATCH_URL}/DeleteBirdBatch/${id}`;

/* =====================================================
   ALIMENTACIÓN
===================================================== */

export const API_FEEDING_URL =
  `${API_BASE_URL}/feedings`;

export const API_FEEDING_ALL_URL =
  `${API_FEEDING_URL}/FeedingAll`;

export const API_FEEDING_CREATE_URL =
  `${API_FEEDING_URL}/CreateFeeding`;

export const API_FEEDING_BY_ID_URL = (
  id: number | string
) => `${API_FEEDING_URL}/Feeding/${id}`;

export const API_FEEDING_UPDATE_URL = (
  id: number | string
) => `${API_FEEDING_URL}/UpdateFeeding/${id}`;

export const API_FEEDING_DELETE_URL = (
  id: number | string
) => `${API_FEEDING_URL}/DeleteFeeding/${id}`;

/* =====================================================
   PRODUCCIÓN DE HUEVOS
===================================================== */

export const API_EGG_PRODUCTION_URL =
  `${API_BASE_URL}/egg-productions`;

export const API_EGG_PRODUCTION_ALL_URL =
  `${API_EGG_PRODUCTION_URL}/EggProductionAll`;

export const API_EGG_PRODUCTION_CREATE_URL =
  `${API_EGG_PRODUCTION_URL}/CreateEggProduction`;

export const API_EGG_PRODUCTION_BY_ID_URL = (
  id: number | string
) => `${API_EGG_PRODUCTION_URL}/EggProduction/${id}`;

export const API_EGG_PRODUCTION_UPDATE_URL = (
  id: number | string
) => `${API_EGG_PRODUCTION_URL}/UpdateEggProduction/${id}`;

export const API_EGG_PRODUCTION_DELETE_URL = (
  id: number | string
) => `${API_EGG_PRODUCTION_URL}/DeleteEggProduction/${id}`;

/* =====================================================
   MORTALIDAD
===================================================== */

export const API_MORTALITY_URL =
  `${API_BASE_URL}/mortalities`;

export const API_MORTALITY_ALL_URL =
  `${API_MORTALITY_URL}/MortalityAll`;

export const API_MORTALITY_CREATE_URL =
  `${API_MORTALITY_URL}/CreateMortality`;

export const API_MORTALITY_BY_ID_URL = (
  id: number | string
) => `${API_MORTALITY_URL}/MortalityById/${id}`;

export const API_MORTALITY_UPDATE_URL = (
  id: number | string
) => `${API_MORTALITY_URL}/UpdateMortality/${id}`;

export const API_MORTALITY_DELETE_URL = (
  id: number | string
) => `${API_MORTALITY_URL}/DeleteMortality/${id}`;

/* =====================================================
   RESPONSABLES
===================================================== */

export const API_RESPONSIBLE_URL =
  `${API_BASE_URL}/responsibles`;

export const API_RESPONSIBLE_ALL_URL =
  `${API_RESPONSIBLE_URL}/ResponsibleAll`;

export const API_RESPONSIBLE_CREATE_URL =
  `${API_RESPONSIBLE_URL}/CreateResponsible`;

export const API_RESPONSIBLE_BY_ID_URL = (
  id: number | string
) => `${API_RESPONSIBLE_URL}/Responsible/${id}`;

export const API_RESPONSIBLE_UPDATE_URL = (
  id: number | string
) => `${API_RESPONSIBLE_URL}/UpdateResponsible/${id}`;

export const API_RESPONSIBLE_DELETE_URL = (
  id: number | string
) => `${API_RESPONSIBLE_URL}/DeleteResponsible/${id}`;

/* =====================================================
   INSUMOS
===================================================== */

export const API_SUPPLY_URL =
  `${API_BASE_URL}/supplies`;

export const API_SUPPLY_ALL_URL =
  `${API_SUPPLY_URL}/SupplyAll`;

export const API_SUPPLY_CREATE_URL =
  `${API_SUPPLY_URL}/CreateSupply`;

export const API_SUPPLY_BY_ID_URL = (
  id: number | string
) => `${API_SUPPLY_URL}/Supply/${id}`;

export const API_SUPPLY_UPDATE_URL = (
  id: number | string
) => `${API_SUPPLY_URL}/UpdateSupply/${id}`;

export const API_SUPPLY_DELETE_URL = (
  id: number | string
) => `${API_SUPPLY_URL}/DeleteSupply/${id}`;