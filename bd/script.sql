-- // se debe ejecutar el script completo //--  

SET FOREIGN_KEY_CHECKS = 0;
drop table if exists users;
drop table if exists roles;
drop table if exists states;
drop table if exists users_company;
drop table if exists companies;
drop table if exists menu;
drop table if exists children_menu;
drop table if exists grand_son_menu;
drop table if exists menu_rol;
drop table if exists contractors;
drop table if exists positions;
drop table if exists groups;
drop table if exists squads;
drop table if exists shifts;




SET FOREIGN_KEY_CHECKS = 1;


-- CREATE TABLA STATE --

CREATE TABLE `states` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- CREATE TABLA ROLES --

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- CREATE TABLA USERS --

-- agrisoft.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `password` varchar(300) NOT NULL,
  `id_state` int(11) NOT NULL,
  `id_company` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_roles_fk` (`id_rol`),
  KEY `users_states_fk` (`id_state`),
  CONSTRAINT `users_roles_FK` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  CONSTRAINT `users_states_FK` FOREIGN KEY (`id_state`) REFERENCES `states` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- CREATE TABLA COMPANIES --

CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(255) NULL,
  `name_company` varchar(255) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `giro` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `web` varchar(255) NOT NULL,
  `compensation_box` varchar(255) NOT NULL,
  `legal_representative_name` varchar(255) NOT NULL,
  `legal_representative_rut` varchar(20) NOT NULL,
  `legal_representative_phone` varchar(20) NOT NULL,
  `legal_representative_email` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- INSERT  STATE --

INSERT INTO agrisoft.states
(descripcion)
VALUES('ACTIVO');
INSERT INTO agrisoft.states
(descripcion)
VALUES('INACTIVO');

-- INSERT  ROLES --

INSERT INTO agrisoft.roles
(descripcion)
VALUES('Superadmin');
INSERT INTO agrisoft.roles
(descripcion)
VALUES('Admin');
INSERT INTO agrisoft.roles
(descripcion)
VALUES('User');
INSERT INTO agrisoft.roles
(descripcion)
VALUES('Cosecheros');


-- INSERT  COMPANY --

INSERT INTO agrisoft.companies
(id, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, logo)
VALUES(1, 'Agrisosft', '18.128.602-4', 'Desarrollo de software', 'XVI', 'Chillán', 'Av. Norte #555', '987654321', 'https://www.agrisoft.cl', '1', 'Javier Donoso', '17.485.937-K', '123456789', 'javier.donoso@gmail.com', 1, 'public/uploads/agrisoft_logo.png');
INSERT INTO agrisoft.companies
(id, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, logo)
VALUES(2, 'Ecomain', '76.942.718-7', 'giro de prueba', 'X', 'Puerto Montt', 'direccion de prueba', '12345678', 'https://stackoverflow.com/', '1', 'javier donoso', '1-9', '12345678', 'prueba@prueba.cl', 1, 'public/uploads/ecomain_logo.jpeg');
INSERT INTO agrisoft.companies
(id, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, logo)
VALUES(3, 'Colun S.A.', '81.094.100-6', 'VENTA AL POR MAYOR DE HUEVOS, LECHE, ABARROTES, Y OTROS ALIMENTOS N.C.P', 'XIV', 'La Unión', 'La Unión S/N', '987654321', 'https://colun.cl', '1', 'Matias', '17.485.937-K', '9999999', 'm.paillalef.c@gmail.com', 1, 'public/uploads/op.jpg');
INSERT INTO agrisoft.companies
(id, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, logo)
VALUES(4, 'Soprole S.A.', '17.485.937-K', 'Restaurant', 'XV', 'Arica', '', '950171534', 'https://www.delify.cl', '1', 'matias', '17.485.937-K', '9999999', 'kinetictechnologiesspa@gmail.com', 0, 'public/uploads/logo_soprole.png');
INSERT INTO agrisoft.companies
(id, name_company, rut, giro, state, city, address, phone, web, compensation_box, legal_representative_name, legal_representative_rut, legal_representative_phone, legal_representative_email, status, logo)
VALUES(5, 'Los Tilos S.A.', '77.947743-9', 'Venta de lacteos al por mayor', 'XIV', 'La Unión', 'Av. Uno #444', '987654321', 'http://www.soprole.cl', '2', 'Matias', '17.485.937-K', '950171534', 'matias@brandis.cl', 1, 'public/uploads/lostilos.jpeg');


-- INSERT  USERS --

INSERT INTO agrisoft.users
(name, lastname, mail, id_rol, password, id_state, id_company)
VALUES('Matias', 'Paillalef', 'm.paillalef.c@gmail.com', 1, '$2a$12$g/81By6B6mSMpPsVo/Pameann1cD0om6TfAJTqaVaHsLrJryRlM.W', 1, 1);
INSERT INTO agrisoft.users
(name, lastname, mail, id_rol, password, id_state, id_company)
VALUES('javier', 'Donoso', 'donoso.javier@gmail.com', 1, '$2b$10$pRqfFjs3n5u3i1Po.Fg4QOsxrJRCUf8uf20YucSrBGZCBB4z/CKuS', 1, 1);
INSERT INTO agrisoft.users
(name, lastname, mail, id_rol, password, id_state, id_company)
VALUES('usuario', 'admin', 'user@user.cl', 1, '$2b$10$X1Qd2iV2ohVwsIoIcCVrye1D87JZUqWzSWNMj7WidaZBCAbRXxpMi', 1, 2);

-- //////////// MENU //////////////


-- CREATE TABLA MENU --

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  `icon` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Inicio', '/dashboard', 'HomeModernIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Configuración', '/dashboard/enviroment', 'Cog8ToothIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Producción', '/dashboard/production', 'TableCellsIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Gestión de personas', '/dashboard/people-management', 'UserGroupIcon');
INSERT INTO agrisoft.menu
(name, url, icon)
VALUES('Reportes', '/dashboard/reports', 'DocumentChartBarIcon');

-- CREATE TABLA CHILDREN_MENU --

CREATE TABLE `children_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `children_menu_menu_FK` (`id_menu`),
  CONSTRAINT `children_menu_menu_FK` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(1, 2, 'Empresas', '/dashboard/enviroment/company');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(2, 2, 'Roles', '/dashboard/enviroment/role-creation');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(3, 2, 'Usuarios', '/dashboard/enviroment/user-creation');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(4, 3, 'Parametrización de campo', '#');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(5, 3, 'Parametrización de producción', '#');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(6, 3, 'Operaciones', '#');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(7, 5, 'Informe de producción', '/dashboard/reports/production-report');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(8, 5, 'Informe de asistencia', '/dashboard/reports/attendance-report');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(9, 5, 'Resumen producción diaria', '/dashboard/reports/daily-production-summary');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(10, 5, 'Producción trabajadores mensual', '/dashboard/reports/monthly-workers-production');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(14, 4, 'Parametrización de personal', '#');
INSERT INTO agrisoft.children_menu
(id, id_menu, name, url)
VALUES(15, 4, 'Carga de asistencia', '/dashboard/people-management/attendance');


-- CREATE TABLA GRAND_SON_MENU --


CREATE TABLE `grand_son_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_children_menu` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_children_menu` (`id_children_menu`),
  CONSTRAINT `grand_son_menu_ibfk_1` FOREIGN KEY (`id_children_menu`) REFERENCES `children_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(1, 14, 'Contratistas', '/dashboard/people-management/contractors');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(2, 14, 'Cargos', '/dashboard/people-management/positions');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(3, 14, 'Grupos', '/dashboard/people-management/groups');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(4, 14, 'Cuadrillas', '/dashboard/people-management/squads');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(5, 14, 'Turnos', '/dashboard/people-management/shifts');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(6, 14, 'Trabajadores', '/dashboard/people-management/workers');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(7, 14, 'Mensajes', '/dashboard/people-management/messages');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(8, 4, 'Campo', '/dashboard/production/parameterization-ground/ground');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(9, 4, 'Sectors / Cuarteles', '/dashboard/production/parameterization-ground/sectors-barracks');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(10, 4, 'Atributos sector', '/dashboard/production/parameterization-ground/sector-attributes');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(11, 4, 'Especies', '/dashboard/production/parameterization-ground/species');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(12, 4, 'Variedades', '/dashboard/production/parameterization-ground/varieties');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(13, 5, 'Formato cosecha', '/dashboard/production/parameterization-production/harvest-format');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(14, 5, 'Calidad', '/dashboard/production/parameterization-production/quality');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(15, 5, 'Tipo de recolección', '/dashboard/production/parameterization-production/type-collection');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(16, 5, 'Temporada', '/dashboard/production/parameterization-production/season');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(17, 5, 'Tratos', '/dashboard/production/parameterization-production/deals');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(18, 5, 'Balanza', '/dashboard/production/parameterization-production/scale');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(19, 5, 'Exportadoras', '/dashboard/production/parameterization-production/exporters');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(20, 6, 'Regularización de producción', '/dashboard/production/operations/regularization-production');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(21, 6, 'Carga producción manual', '/dashboard/production/operations/manual-upload');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(22, 6, 'Cierre de temporada', '/dashboard/production/operations/season-closing');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(23, 6, 'Registro balanza', '/dashboard/production/operations/scale-register');
INSERT INTO agrisoft.grand_son_menu
(id, id_children_menu, name, url)
VALUES(24, 6, 'Guía de Despacho', '/dashboard/production/operations/dispatch-guide');


-- CREATE TABLA MENU_ROL --

CREATE TABLE `menu_rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_rol_menu_FK` (`id_rol`),
  KEY `menu_rol_menu_FK_1` (`id_menu`),
  CONSTRAINT `menu_rol_menu_FK` FOREIGN KEY (`id_rol`) REFERENCES `menu` (`id`),
  CONSTRAINT `menu_rol_menu_FK_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(1, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(2, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(3, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(4, 1);
INSERT INTO agrisoft.menu_rol
(id_menu, id_rol)
VALUES(5, 1);



-- CREATE TABLA CONTRACTORS --

CREATE TABLE `contractors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rut` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `giro` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.contractors
(rut, name, lastname, giro, phone, email, state, city, status, id_company)
VALUES('16.304.017-4', 'contratista', 'de prueba', 'prueba', '123456789', 'prueba@prueba.cl', 'XV', 'Arica', 1, 1);
INSERT INTO agrisoft.contractors
(rut, name, lastname, giro, phone, email, state, city, status, id_company)
VALUES('6.110.475-5', 'contratista 2', 'prueba 2', 'prueba 2', '123456789', 'prueba@prueba.cl', 'XIII', 'Santiago', 1, 1);


-- CREATE TABLA POSITION --

CREATE TABLE `positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `positions_companies_FK` (`id_company`),
  CONSTRAINT `positions_companies_FK` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.positions
(name, status, id_company)
VALUES('Cosechero', 1, 1);
INSERT INTO agrisoft.positions
(name, status, id_company)
VALUES('Revisores', 1, 1);
INSERT INTO agrisoft.positions
(name, status, id_company)
VALUES('Recolectores', 0, 1);

-- CREATE TABLA GROUPS --

CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_companies_FK` (`id_company`),
  CONSTRAINT `groups_companies_FK` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.`groups`
(name, status, id_company)
VALUES('Grupo nocturno', 1, 1);
INSERT INTO agrisoft.`groups`
(name, status, id_company)
VALUES('Grupo tarde', 1, 1);
INSERT INTO agrisoft.`groups`
(name, status, id_company)
VALUES('Grupo mañana', 0, 1);

-- CREATE TABLA SQUADS --

CREATE TABLE `squads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_group` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `id_company` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `squads_groups_FK` (`id_group`),
  KEY `squads_companies_FK` (`id_company`),
  CONSTRAINT `squads_companies_FK` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id`),
  CONSTRAINT `squads_groups_FK` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.squads
(name, id_group, status, id_company)
VALUES('Cuadrilla Nocturna', 1, 1, 1);
INSERT INTO agrisoft.squads
(name, id_group, status, id_company)
VALUES('Cuadrilla Tardes', 2, 0, 1);
INSERT INTO agrisoft.squads
(name, id_group, status, id_company)
VALUES('Cuadrilla Mañana', 3, 1, 1);


-- CREATE TABLA SHIFTS --

CREATE TABLE `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `monday_opening_time` time DEFAULT NULL,
  `monday_closing_time` time DEFAULT NULL,
  `tuesday_opening_time` time DEFAULT NULL,
  `tuesday_closing_time` time DEFAULT NULL,
  `wednesday_opening_time` time DEFAULT NULL,
  `wednesday_closing_time` time DEFAULT NULL,
  `thursday_opening_time` time DEFAULT NULL,
  `thursday_closing_time` time DEFAULT NULL,
  `friday_opening_time` time DEFAULT NULL,
  `friday_closing_time` time DEFAULT NULL,
  `saturday_opening_time` time DEFAULT NULL,
  `saturday_closing_time` time DEFAULT NULL,
  `sunday_opening_time` time DEFAULT NULL,
  `sunday_closing_time` time DEFAULT NULL,
  `id_company` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shifts_companies_FK` (`id_company`),
  CONSTRAINT `shifts_companies_FK` FOREIGN KEY (`id_company`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.shifts
(status, name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, id_company)
VALUES
(1, 'Turno Mañana', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', 1),
(1, 'Turno Tarde', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', 1),
(0, 'Turno Noche', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '01:01:00', 1);


-- agrisoft.ground definition

CREATE TABLE `ground` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `zone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `company_id` int DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ground_companies_FK` (`company_id`),
  CONSTRAINT `ground_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO agrisoft.ground
(name, state, city, address, latitude, longitude, `zone`, company_id, status)
VALUES
('Hacienda Los Pinos', 'XII', 'Talca', 'Calle Los Pinos #123', NULL, NULL, 'Centro', 4, '1'),
('Tierras del Sol', 'X', 'Calama', 'Av. del Desierto #567', NULL, NULL, 'Norte', 3, '1'),
('Valle Verde', 'VI', 'Rancagua', 'Camino a Los Robles #321', NULL, NULL, 'Sur', 5, '1'),
('Pampa Hermosa', 'III', 'Concepción', 'Ruta 160 Km 10', NULL, NULL, 'Sur', 1, '1'),
('Cerro Alto', 'VIII', 'Constitución', 'Av. Cerro Alto #987', NULL, NULL, 'Centro', 2, '1'),
('Las Acacias', 'IX', 'Osorno', 'Calle Las Acacias #456', NULL, NULL, 'Sur', 4, '1'),
('Lomas Verdes', 'XIV', 'Copiapó', 'Camino Lomas Verdes #789', NULL, NULL, 'Norte', 3, '1'),
('Bosque Azul', 'IV', 'La Serena', 'Av. Bosque Azul #234', NULL, NULL, 'Centro', 5, '1'),
('Arenas Blancas', 'I', 'Arica', 'Playa Arenas Blancas', NULL, NULL, 'Norte', 1, '1'),
('Cumbres Verdes', 'V', 'Valdivia', 'Cerro Cumbres Verdes', NULL, NULL, 'Sur', 2, '1'),
('Los Almendros', 'XIII', 'Antofagasta', 'Calle Los Almendros #567', NULL, NULL, 'Norte', 4, '1'),
('Monte Azul', 'XI', 'Iquique', 'Cerro Monte Azul', NULL, NULL, 'Norte', 5, '1'),
('Mirador del Lago', 'VIII', 'Valdivia', 'Camino al Mirador', NULL, NULL, 'Sur', 3, '1'),
('Santa Teresa', 'II', 'Santiago', 'Av. Santa Teresa #789', NULL, NULL, 'Centro', 1, '1'),
('Los Olivos', 'XII', 'Talca', 'Av. Los Olivos #456', NULL, NULL, 'Centro', 2, '1'),
('El Vergel', 'VI', 'Rancagua', 'Km 3 Carretera El Vergel', NULL, NULL, 'Sur', 4, '1'),
('San Rafael', 'IX', 'Osorno', 'Av. San Rafael #234', NULL, NULL, 'Sur', 5, '1'),
('Punta Norte', 'III', 'Concepción', 'Punta Norte #678', NULL, NULL, 'Centro', 1, '1'),
('Los Robles', 'IV', 'La Serena', 'Av. Los Robles #901', NULL, NULL, 'Centro', 3, '1'),
('El Arrayán', 'XI', 'Iquique', 'Camino El Arrayán', NULL, NULL, 'Norte', 2, '1'),
('Berries Diguillin', 'XVI', 'Ránqui', 'Av 1 #4444', NULL, NULL, 'Norte', 1, '1'),
('Las Palmas', 'V', 'Valdivia', 'Calle Las Palmas #543', NULL, NULL, 'Sur', 1, '1');


-- agrisoft.sector definition

CREATE TABLE `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ground` int NOT NULL,
  `company_id` int NOT NULL,
  `varieties` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sector_ground_FK` (`ground`),
  KEY `sector_companies_FK` (`company_id`),
  CONSTRAINT `sector_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `sector_ground_FK` FOREIGN KEY (`ground`) REFERENCES `ground` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO sector (id, name, status, ground, company_id, varieties) 
VALUES
('Dukes', '1', 1, 1, NULL),
('Sector B', '1', 1, 1, NULL),
('Sector C', '0', 25, 2, NULL),
('Sector D', '1', 1, 1, NULL),
('Sector E', '0', 1, 1, NULL),
('Sector F', '1', 1, 1, NULL),
('Sector G', '1', 1, 1, NULL),
('Sector H', '0', 1, 1, NULL),
('Sector I', '1', 1, 1, NULL),
('Sector J', '1', 17, 3, NULL),
('Sector K', '0', 1, 1, NULL),
('Sector L', '1', 1, 1, NULL),
('Sector M', '0', 11, 4, NULL),
('Sector N', '1', 32, 1, NULL),
('Sector O', '1', 22, 5, NULL),
('Sector P', '0', 32, 1, NULL),
('Sector Q', '1', 32, 1, NULL),
('Sector R', '0', 32, 1, NULL);


-- agrisoft.varieties definition

CREATE TABLE `varieties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `company_id` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `varieties_companies_FK` (`company_id`),
  CONSTRAINT `varieties_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO varieties (name, company_id, status) 
VALUES
('Duke', 1, 1),
('Patriot', 2, 1),
('Legacy', 3, 1),
('Bluecrop', 4, 0),
('Bluejay', 5, 1),
('Toro', 1, 0),
('Elliott', 2, 1),
('Aurora', 3, 0),
('Jersey', 4, 1);
('North Blue', 5, 0),
('North Country', 1, 1),
('Top Hat', 2, 1),
('Bluegold', 3, 0),
('Northland', 4, 1),
('Patriot', 5, 0),
('Duke', 1, 1),
('Legacy', 2, 1),
('Bluecrop', 3, 0),
('Bluejay', 4, 1),
('Toro', 5, 0),
('Elliott', 1, 1),
('Aurora', 2, 1),
('Jersey', 3, 0),
('North Blue', 4, 1),
('North Country', 5, 0),
('Top Hat', 1, 1),
('Bluegold', 2, 0);

-- agrisoft.workers definition

CREATE TABLE `workers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname2` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `born_date` date DEFAULT NULL,
  `gender` enum('Masculino','Femenino','Otro') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state_civil` enum('Soltero','Casado','Divorciado','Viudo') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_company` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_admission` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `position` int DEFAULT NULL,
  `contractor` int DEFAULT NULL,
  `squad` int DEFAULT NULL,
  `leader_squad` int DEFAULT NULL,
  `shift` int DEFAULT NULL,
  `wristband` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `observation` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_type` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `afp` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `health` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workers_companies_FK` (`company_id`),
  KEY `workers_contractors_FK` (`contractor`),
  KEY `workers_positions_FK` (`position`),
  KEY `workers_shifts_FK` (`shift`),
  KEY `workers_squads_FK` (`squad`),
  CONSTRAINT `workers_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `workers_contractors_FK` FOREIGN KEY (`contractor`) REFERENCES `contractors` (`id`),
  CONSTRAINT `workers_positions_FK` FOREIGN KEY (`position`) REFERENCES `positions` (`id`),
  CONSTRAINT `workers_shifts_FK` FOREIGN KEY (`shift`) REFERENCES `shifts` (`id`),
  CONSTRAINT `workers_squads_FK` FOREIGN KEY (`squad`) REFERENCES `squads` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(2, '8.765.432-1', 'Maria', 'Lopez', 'Rodriguez', '1985-05-15', 'Femenino', 'Casado', 'XIII', 'Santiago', 'Avenida 456', '876543210', '876543210', '2019-06-15', 1, 1, 1, 1, 1, 1, '1A2B3C4D', 'Ingreso trabajador 9:50 por lejanía', 'Banco de Chile', 'Cuenta Corriente', '000010687709', 'AFP Provida', 'Fonasa', 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(3, '11.261.733-7', 'Pedro', 'Martinez', 'Sanchez', '1992-03-22', 'Masculino', 'Divorciado', 'VIII', 'Concepción', 'Calle 789', '765432109', '765432109', '2020-08-20', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(4, '23456789-0', 'Ana', 'Garcia', 'Fernandez', '1988-11-30', 'Femenino', 'Viudo', 'V', 'Valparaiso', 'Calle 101', '654321098', '654321098', '2018-02-10', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(6, '17.485.937-K', 'Matias', 'Paillalef', 'Castro', NULL, 'Masculino', 'Casado', 'VII', 'Maule', 'Pasaje Alerce Andino #1877', '950171534', '9898989809', '2024-01-01', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(7, '18.128.602-4', 'Daniela', 'Marchant', 'Toledo', NULL, 'Femenino', 'Casado', 'I', 'Talca', 'Area 1', '950171534', '9898989809', '2024-07-19', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(8, '18.128.602-4', 'Daniela', 'Marchant', 'Toledo', '2024-07-12', 'Femenino', 'Casado', 'I', 'Talca', 'Area 1', '950171534', '9898989809', '2024-07-19', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(9, '17.485.937-K', 'Rodrigo', 'Chandía', 'Chandía', '2024-07-01', 'Masculino', 'Soltero', 'XV', 'Arica', 'ewweweew', '950171534', '9898989809', '2024-07-11', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(10, '11.111.111-1', 'Mateo', 'Paillalef', 'Marchat', '2024-07-01', 'Femenino', 'Divorciado', 'XV', 'Iquique', '11111', '9 5017 1534', '9898989809', '2024-07-02', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(31, '11.261.733-7', 'Mario', 'Paillalef', 'Echeverria', '1968-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2023-12-31', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(32, '11.261.733-7', 'Mario', 'Paillalef', 'Nuñez', '1969-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2023-12-31', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(33, '11.261.733-7', 'Mario', 'Paillalef', 'Fernandez', '1968-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2023-12-31', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(34, '11.261.733-7', 'Mario', 'Paillalef', 'Castro', '1942-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2021-12-31', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(35, '11.261.733-7', 'Mario', 'Paillalef', 'Echeverria', '1968-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2023-12-31', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(36, '11.261.733-7', 'Mario', 'Paillalef', 'Nuñez', '1969-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2023-12-31', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(37, '11.261.733-7', 'Mario', 'Paillalef', 'Fernandez', '1968-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2023-12-31', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(38, '11.261.733-7', 'Mario', 'Paillalef', 'Castro', '1942-01-24', 'Masculino', 'Casado', 'VII', 'Talca', 'Pasaje 19', '987654321', '98765432', '2021-12-31', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(39, '21.123.456-7', 'Sofia', 'Gonzalez', 'Torres', '1990-09-12', 'Femenino', 'Soltero', 'III', 'La Serena', 'Avenida del Mar 123', '912345678', '912345678', '2021-05-15', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(40, '22.234.567-8', 'Lucas', 'Hernandez', 'Guerra', '1983-04-25', 'Masculino', 'Casado', 'II', 'Valdivia', 'Calle Colón 234', '923456789', '923456789', '2020-03-22', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(41, '23.345.678-9', 'Camila', 'Morales', 'Vega', '1995-07-18', 'Femenino', 'Soltero', 'XIV', 'Antofagasta', 'Calle Belgrano 345', '934567890', '934567890', '2022-11-03', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(42, '24.456.789-0', 'Javier', 'Ruiz', 'Salazar', '1978-12-09', 'Masculino', 'Viudo', 'VI', 'Punta Arenas', 'Avenida España 456', '945678901', '945678901', '2019-07-16', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(43, '25.567.890-1', 'Valentina', 'Fuentes', 'Bravo', '1991-01-14', 'Femenino', 'Divorciado', 'IX', 'Temuco', 'Calle O’Higgins 567', '956789012', '956789012', '2020-08-25', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(44, '26.678.901-2', 'Alejandro', 'Alvarez', 'Martinez', '1986-03-29', 'Masculino', 'Soltero', 'IV', 'La Serena', 'Avenida 18 de Septiembre 678', '967890123', '967890123', '2018-12-10', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(45, '27.789.012-3', 'Isabella', 'Cordero', 'Soto', '1993-10-05', 'Femenino', 'Soltero', 'X', 'Coquimbo', 'Calle Los Paltos 789', '978901234', '978901234', '2021-02-18', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(46, '28.890.123-4', 'Fernando', 'Navarro', 'Fuentes', '1981-06-22', 'Masculino', 'Casado', 'VII', 'Rancagua', 'Avenida Central 890', '989012345', '989012345', '2017-09-09', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(47, '29.901.234-5', 'Gabriela', 'Diaz', 'Muñoz', '1990-11-03', 'Femenino', 'Viudo', 'VI', 'Los Andes', 'Calle Independencia 901', '990123456', '990123456', '2022-03-12', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(48, '30.012.345-6', 'Ricardo', 'Bravo', 'Torres', '1985-04-30', 'Masculino', 'Soltero', 'XIII', 'Santiago', 'Avenida Los Libertadores 012', '901234567', '901234567', '2020-05-25', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(49, '31.123.456-7', 'Margarita', 'Vega', 'Cordero', '1992-07-08', 'Femenino', 'Casado', 'V', 'Viña del Mar', 'Calle Las Heras 123', '912345679', '912345679', '2019-01-18', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(50, '32.234.567-8', 'Carlos', 'Castro', 'Molina', '1977-02-14', 'Masculino', 'Divorciado', 'VIII', 'Temuco', 'Calle Alemania 234', '923456780', '923456780', '2020-06-14', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(51, '33.345.678-9', 'Patricia', 'Ramirez', 'Gonzalez', '1989-10-29', 'Femenino', 'Soltero', 'II', 'Puerto Montt', 'Avenida San Francisco 345', '934567891', '934567891', '2021-03-11', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(52, '34.456.789-0', 'Alejandro', 'Pérez', 'Mora', '1994-05-20', 'Masculino', 'Casado', 'VII', 'Talca', 'Calle 6 Oriente 456', '945678902', '945678902', '2022-07-24', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(53, '35.567.890-1', 'Nicole', 'Silva', 'Herrera', '1988-12-12', 'Femenino', 'Viudo', 'IX', 'Los Ángeles', 'Avenida 4 Norte 567', '956789013', '956789013', '2020-09-16', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(54, '36.678.901-2', 'Eduardo', 'Moreno', 'Jimenez', '1984-03-05', 'Masculino', 'Casado', 'XII', 'La Serena', 'Calle Las Torres 678', '967890124', '967890124', '2021-10-30', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(55, '37.789.012-3', 'Florencia', 'Martínez', 'Paredes', '1991-11-25', 'Femenino', 'Divorciado', 'IV', 'Antofagasta', 'Calle Rancagua 789', '978901235', '978901235', '2022-06-22', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(57, '39.901.234-5', 'Martina', 'Soto', 'Gómez', '1995-01-19', 'Femenino', 'Soltero', 'XIII', 'Santiago', 'Calle Los Bosques 901', '990123457', '990123457', '2023-02-14', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(58, '40.012.345-6', 'Héctor', 'Ortega', 'Pérez', '1983-09-21', 'Masculino', 'Viudo', 'VIII', 'La Serena', 'Calle Talca 012', '901234568', '901234568', '2020-11-16', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(59, '41.123.456-7', 'Juana', 'Cifuentes', 'Bravo', '1992-02-10', 'Femenino', 'Casado', 'VII', 'Talca', 'Calle Libertador 123', '912345680', '912345680', '2022-01-29', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(60, '42.234.567-8', 'Felipe', 'Vásquez', 'Muñoz', '1987-08-07', 'Masculino', 'Divorciado', 'X', 'Coquimbo', 'Avenida del Mar 234', '923456781', '923456781', '2021-12-13', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(61, '43.345.678-9', 'Carmen', 'Pérez', 'Vergara', '1980-10-04', 'Femenino', 'Soltero', 'IV', 'Puerto Montt', 'Calle Bernardo O’Higgins 345', '934567892', '934567892', '2022-07-07', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO agrisoft.workers
(id, rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, `position`, contractor, squad, leader_squad, shift, wristband, observation, bank, account_type, account_number, afp, health, company_id)
VALUES(62, '44.456.789-0', 'Antonio', 'Rivas', 'Lozano', '1994-06-20', 'Masculino', 'Casado', 'XII', 'Iquique', 'Avenida Prat 456', '945678903', '945678903', '2023-05-30', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);


-- agrisoft.season definition

CREATE TABLE `season` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `period` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `date_from` datetime NOT NULL,
  `date_until` datetime NOT NULL,
  `shifts` json DEFAULT NULL,
  `status` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.season
(name, period, date_from, date_until, shifts, status, company_id)
VALUES
('2021-2022', 'Bimestral', '2021-11-24 00:00:00', '2022-03-31 00:00:00', '[1, 2]', 2, 1),
('2022-2023', 'Bimestral', '2022-11-24 00:00:00', '2024-08-04 00:00:00', '[1, 2]', 1, 1),
('2023-2024', 'Anual', '2023-11-24 00:00:00', '2024-02-28 00:00:00', '[1]', 0, 1);



-- agrisoft.quality definition

CREATE TABLE `quality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `abbreviation` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quality_companies_FK` (`company_id`),
  CONSTRAINT `quality_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.quality
(name, abbreviation, status, company_id)
VALUES
('GRANEL AVELLANA', 'GRANEL', 1, 1),
('EXPORTACIÓN-MAÑANA', 'EXP M.', 1, 1),
('BULK-MAÑANA', 'BULK M.', 1, 2),
('IQF - MAÑANA', 'IQF M.', 1, 2);
('EXPORTACIÓN-TARDE', 'EXP T.', 1, 3),
('BULK-TARDE', 'BULK', 1, 4),
('IQF TARDE', 'IQF T.', 1, 5),
('GERARDO CASANUEVA', 'CONT 1', 1, 1);


-- agrisoft.`scale` definition

CREATE TABLE `scale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `scale_companies_FK` (`company_id`),
  CONSTRAINT `scale_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.`scale`
(name, location, status, company_id)
VALUES
('balanza', 'Chillan', 1, 1),
('balanza 2', 'Concepción', 1, 1),
('balanza', 'Talca', 1, 2),
('balanza', 'Linares', 1, 3),
('balanza 3', 'Concepción', 0, 1);



-- agrisoft.scale_register definition

CREATE TABLE `scale_register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scale` int NOT NULL,
  `quality` int NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `boxes` int DEFAULT NULL,
  `kg_boxes` double DEFAULT NULL,
  `specie` int NOT NULL,
  `variety` int NOT NULL,
  `season` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `scale_register_scale_FK` (`scale`),
  KEY `scale_register_quality_FK` (`quality`),
  KEY `scale_register_species_FK` (`specie`),
  KEY `scale_register_varieties_FK` (`variety`),
  KEY `scale_register_season_FK` (`season`),
  CONSTRAINT `scale_register_quality_FK` FOREIGN KEY (`quality`) REFERENCES `quality` (`id`),
  CONSTRAINT `scale_register_scale_FK` FOREIGN KEY (`scale`) REFERENCES `scale` (`id`),
  CONSTRAINT `scale_register_season_FK` FOREIGN KEY (`season`) REFERENCES `season` (`id`),
  CONSTRAINT `scale_register_species_FK` FOREIGN KEY (`specie`) REFERENCES `species` (`id`),
  CONSTRAINT `scale_register_varieties_FK` FOREIGN KEY (`variety`) REFERENCES `varieties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.scale_register
(`scale`, quality, `date`, boxes, kg_boxes, specie, variety, season, company_id)
VALUES
(1, 1, '2024-08-06 10:00:00', 10, 13.3, 1, 1, 1, 1),
(1, 1, '2024-08-06 00:00:00', 10, 13.3, 1, 11, 1, 1),
(2, 8, '2024-08-08 00:00:00', 33, 25.5, 2, 16, 2, 1);


-- agrisoft.type_collection definition

CREATE TABLE `type_collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_collection_companies_FK` (`company_id`),
  CONSTRAINT `type_collection_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.type_collection
(name, status, company_id)
VALUES
('Manual', 1, 1),
('Manual', 0, 1),
('Granular', 1, 2),
('Manual', 1, 2),
('Manual', 0, 3),
('Granular', 1, 4);



-- agrisoft.harvest_format definition

CREATE TABLE `harvest_format` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `tara_base` double(18,4) DEFAULT NULL,
  `min_weight` double(18,4) DEFAULT NULL,
  `max_weight` double(18,4) DEFAULT NULL,
  `quantity_trays` double(18,4) DEFAULT NULL,
  `average_weight` double(18,4) DEFAULT NULL,
  `collection` int NOT NULL,
  `specie` int NOT NULL,
  `status` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `harvest_format_type_collection_FK` (`collection`),
  KEY `harvest_format_companies_FK` (`company_id`),
  KEY `harvest_format_species_FK` (`specie`),
  CONSTRAINT `harvest_format_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `harvest_format_species_FK` FOREIGN KEY (`specie`) REFERENCES `species` (`id`),
  CONSTRAINT `harvest_format_type_collection_FK` FOREIGN KEY (`collection`) REFERENCES `type_collection` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.harvest_format
(name, tara_base, min_weight, max_weight, quantity_trays, average_weight, collection, specie, status, company_id)
VALUES
('tarro 1', 0.5, 12.0, 30.0, 20.0, 30.0, 1, 1, 1, 1),
('tarro 2', 0.5, 12.0, 30.0, 20.0, 30.0, 1, 2, 1, 1),
('tarro 3', 0.5, 44.0, 60.0, 4.0, 20.0, 1, 2, 0, 1);


-- agrisoft.deals definition

CREATE TABLE `deals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `harvest_format` int NOT NULL,
  `quality` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `status` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deals_harvest_format_FK` (`harvest_format`),
  KEY `deals_quality_FK` (`quality`),
  KEY `deals_companies_FK` (`company_id`),
  CONSTRAINT `deals_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `deals_harvest_format_FK` FOREIGN KEY (`harvest_format`) REFERENCES `harvest_format` (`id`),
  CONSTRAINT `deals_quality_FK` FOREIGN KEY (`quality`) REFERENCES `quality` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO agrisoft.deals
(harvest_format, quality, name, price, status, company_id)
VALUES
(2, 1, 'Trato tomates 2', 10000000, 1, 1),
(1, 1, 'Trato tomates', 10000000, 1, 1);


-- agrisoft.dispatch_guide definition

CREATE TABLE `dispatch_guide` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client` int NOT NULL,
  `date` date NOT NULL,
  `season` int NOT NULL,
  `correlative` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `boxes` int DEFAULT NULL,
  `kg` float DEFAULT NULL,
  `quality` int DEFAULT NULL,
  `company_id` int NOT NULL,
  `ground` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dispatch_guide_season_FK` (`season`),
  KEY `dispatch_guide_exporters_FK` (`client`),
  KEY `dispatch_guide_quality_FK` (`quality`),
  KEY `dispatch_guide_ground_FK` (`ground`),
  CONSTRAINT `dispatch_guide_exporters_FK` FOREIGN KEY (`client`) REFERENCES `exporters` (`id`),
  CONSTRAINT `dispatch_guide_ground_FK` FOREIGN KEY (`ground`) REFERENCES `ground` (`id`),
  CONSTRAINT `dispatch_guide_quality_FK` FOREIGN KEY (`quality`) REFERENCES `quality` (`id`),
  CONSTRAINT `dispatch_guide_season_FK` FOREIGN KEY (`season`) REFERENCES `season` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(1, 1, '2024-01-15', 1, '2', 23, 22.5, 2, 1, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(2, 1, '2024-01-15', 1, 'A20240115', 20, 150.5, 1, 1, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(3, 1, '2024-01-20', 1, 'B20240120', 15, 100.0, 1, 1, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(4, 1, '2024-02-05', 1, 'C20240205', 10, 80.0, 1, 2, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(5, 1, '2024-02-15', 1, 'D20240215', 25, 200.0, 1, 3, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(6, 1, '2024-03-01', 1, 'E20240301', 18, 130.0, 1, 1, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(7, 1, '2024-03-10', 1, 'F20240310', 22, 160.0, 1, 3, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(8, 1, '2024-04-01', 1, 'G20240401', 12, 90.0, 1, 4, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(9, 1, '2024-04-15', 1, 'H20240415', 30, 250.0, 1, 4, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(10, 1, '2024-05-05', 1, 'I20240505', 16, 120.0, 1, 2, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(11, 1, '2024-05-20', 1, 'J20240520', 14, 110.0, 1, 1, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(14, 2, '2024-08-08', 2, 'FD87460', 22, 330.0, 8, 1, 1);
INSERT INTO agrisoft.dispatch_guide
(id, client, `date`, season, correlative, boxes, kg, quality, company_id, ground)
VALUES(15, 2, '2024-08-28', 3, '5683', 98, 1254.0, 2, 1, 1);


-- agrisoft.manual_harvesting definition

CREATE TABLE `manual_harvesting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zone` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ground` int NOT NULL,
  `sector` int NOT NULL,
  `squad` int DEFAULT NULL,
  `squad_leader` int DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `worker` int NOT NULL,
  `worker_rut` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `harvest_date` datetime DEFAULT NULL,
  `specie` int NOT NULL,
  `variety` int NOT NULL,
  `boxes` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kg_boxes` decimal(10,2) DEFAULT NULL,
  `quality` int DEFAULT NULL,
  `hilera` int DEFAULT NULL,
  `harvest_format` int DEFAULT NULL,
  `weigher_rut` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sync` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sync_date` datetime DEFAULT NULL,
  `season` int DEFAULT NULL,
  `turns` int DEFAULT NULL,
  `date_register` datetime DEFAULT NULL,
  `temp` double(6,2) DEFAULT NULL,
  `wet` double(6,2) DEFAULT NULL,
  `company_id` int NOT NULL,
  `contractor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manual_harvesting_companies_FK` (`company_id`),
  KEY `manual_harvesting_ground_FK` (`ground`),
  KEY `manual_harvesting_sector_FK` (`sector`),
  KEY `manual_harvesting_squads_FK` (`squad`),
  KEY `manual_harvesting_workers_FK` (`worker`),
  KEY `manual_harvesting_species_FK` (`specie`),
  KEY `manual_harvesting_varieties_FK` (`variety`),
  KEY `manual_harvesting_quality_FK` (`quality`),
  KEY `manual_harvesting_harvest_format_FK` (`harvest_format`),
  KEY `manual_harvesting_contractors_FK` (`contractor`),
  CONSTRAINT `manual_harvesting_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `manual_harvesting_contractors_FK` FOREIGN KEY (`contractor`) REFERENCES `contractors` (`id`),
  CONSTRAINT `manual_harvesting_ground_FK` FOREIGN KEY (`ground`) REFERENCES `ground` (`id`),
  CONSTRAINT `manual_harvesting_harvest_format_FK` FOREIGN KEY (`harvest_format`) REFERENCES `harvest_format` (`id`),
  CONSTRAINT `manual_harvesting_quality_FK` FOREIGN KEY (`quality`) REFERENCES `quality` (`id`),
  CONSTRAINT `manual_harvesting_sector_FK` FOREIGN KEY (`sector`) REFERENCES `sector` (`id`),
  CONSTRAINT `manual_harvesting_species_FK` FOREIGN KEY (`specie`) REFERENCES `species` (`id`),
  CONSTRAINT `manual_harvesting_squads_FK` FOREIGN KEY (`squad`) REFERENCES `squads` (`id`),
  CONSTRAINT `manual_harvesting_varieties_FK` FOREIGN KEY (`variety`) REFERENCES `varieties` (`id`),
  CONSTRAINT `manual_harvesting_workers_FK` FOREIGN KEY (`worker`) REFERENCES `workers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(1, 'Norte', 1, 1, 1, 3, 2, 2, '11.261.733-7', '2024-08-06 10:00:00', 1, 1, '10', 20.00, 1, 5, 1, '11.261.733-7', 'pesador3-9633', '2022-01-06 09:42:47', 1, 1, '2024-08-06 10:00:00', 17.0, 19.0, 1, 1);
INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(2, 'Norte', 10, 1, 1, 3, 2, 2, '11.261.733-7', '2024-08-06 14:00:00', 1, 1, '10', 315.00, 2, 5, 2, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 2, 2);
INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(4, 'Sur', 1, 14, 1, NULL, 4, 3, '8.765.432-1', '2024-08-21 00:00:00', 1, 2, '33', 33.88, 1, 4, 1, NULL, NULL, NULL, 2, NULL, '2024-08-04 10:00:00', 20.0, 12.0, 1, NULL);
INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(5, 'Norte', 1, 1, 1, NULL, 1, 2, NULL, '2024-08-18 00:00:00', 1, 16, '1', 4.70, 2, 5, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, NULL);
INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(6, 'Norte', 1, 1, 1, 3, 2, 2, '11.261.733-7', '2024-08-06 14:00:00', 1, 2, '10', 86.00, 1, 5, 1, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1, NULL);
INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(7, 'Norte', 1, 1, 1, 3, 2, 2, '11.261.733-7', '2024-08-06 10:00:00', 1, 1, '10', 20.00, 1, 5, 1, '11.261.733-7', 'pesador3-9633', '2022-01-06 09:42:47', 2, 1, '2024-08-06 10:00:00', 12.0, 35.0, 1, 1);
INSERT INTO agrisoft.manual_harvesting
(id, `zone`, ground, sector, squad, squad_leader, batch, worker, worker_rut, harvest_date, specie, variety, boxes, kg_boxes, quality, hilera, harvest_format, weigher_rut, sync, sync_date, season, turns, date_register, temp, wet, company_id, contractor)
VALUES(8, 'Sur', 1, 14, 1, NULL, 4, 3, '8.765.432-1', '2024-08-21 00:00:00', 1, 2, '33', 33.88, 1, 4, 1, NULL, NULL, NULL, 2, NULL, '2024-08-07 10:00:00', 23.0, 44.0, 1, NULL);