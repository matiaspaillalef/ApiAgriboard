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
(id_menu, name, url)
VALUES(2, 'Empresa', '/dashboard/enviroment/company');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(2, 'Creación de roles', '/dashboard/enviroment/role-creation');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(2, 'Creación de usuarios', '/dashboard/enviroment/user-creation');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Campo', '/dashboard/production/ground');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Sectors / Cuarteles', '/dashboard/production/sectors-barracks');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Atributos de sector', '/dashboard/production/sector attributes');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Especies', '/dashboard/production/species');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Variedades', '/dashboard/production/varieties');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Ciclos', '/dashboard/production/cycles');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Lotes', '/dashboard/production/lots');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Plantaciones', '/dashboard/production/plantations');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Cosechas', '/dashboard/production/harvests');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(3, 'Inventario', '/dashboard/production/inventory');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(4, 'Parametrización de personal', '#');
INSERT INTO agrisoft.children_menu
(id_menu, name, url)
VALUES(4, 'Carga de asistencia', '/dashboard/people-management/attendance');


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
(id_children_menu, name, url)
VALUES(14, 'Contratistas', '/dashboard/people-management/contractors');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Cargos', '/dashboard/people-management/positions');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Grupos', '/dashboard/people-management/groups');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Cuadrillas', '/dashboard/people-management/squads');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Turnos', '/dashboard/people-management/shifts');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Trabajadores', '/dashboard/people-management/workers');
INSERT INTO agrisoft.grand_son_menu
(id_children_menu, name, url)
VALUES(14, 'Mensajes', '/dashboard/people-management/messages');


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
VALUES(1, 'Turno Mañana', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', '08:00:00', '12:00:00', 1);
INSERT INTO agrisoft.shifts
(status, name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, id_company)
VALUES(1, 'Turno Tarde', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', '14:00:00', '18:00:00', 1);
INSERT INTO agrisoft.shifts
(status, name, monday_opening_time, monday_closing_time, tuesday_opening_time, tuesday_closing_time, wednesday_opening_time, wednesday_closing_time, thursday_opening_time, thursday_closing_time, friday_opening_time, friday_closing_time, saturday_opening_time, saturday_closing_time, sunday_opening_time, sunday_closing_time, id_company)
VALUES(0, 'Turno Noche', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '00:00:00', '20:00:00', '01:01:00', 1);


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
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workers_companies_FK` (`company_id`),
  CONSTRAINT `workers_companies_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO workers (rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, company_id) 
VALUES
INSERT INTO workers (rut, name, lastname, lastname2, born_date, gender, state_civil, state, city, address, phone, phone_company, date_admission, status, company_id) 
VALUES
('21.123.456-7', 'Sofia', 'Gonzalez', 'Torres', '1990-09-12', 'Femenino', 'Soltero', 'III', 'La Serena', 'Avenida del Mar 123', '912345678', '912345678', '2021-05-15', 1, 2),
('22.234.567-8', 'Lucas', 'Hernandez', 'Guerra', '1983-04-25', 'Masculino', 'Casado', 'II', 'Valdivia', 'Calle Colón 234', '923456789', '923456789', '2020-03-22', 1, 2),
('23.345.678-9', 'Camila', 'Morales', 'Vega', '1995-07-18', 'Femenino', 'Soltero', 'XIV', 'Antofagasta', 'Calle Belgrano 345', '934567890', '934567890', '2022-11-03', 0, 3),
('24.456.789-0', 'Javier', 'Ruiz', 'Salazar', '1978-12-09', 'Masculino', 'Viudo', 'VI', 'Punta Arenas', 'Avenida España 456', '945678901', '945678901', '2019-07-16', 1, 3),
('25.567.890-1', 'Valentina', 'Fuentes', 'Bravo', '1991-01-14', 'Femenino', 'Divorciado', 'IX', 'Temuco', 'Calle O’Higgins 567', '956789012', '956789012', '2020-08-25', 1, 3),
('26.678.901-2', 'Alejandro', 'Alvarez', 'Martinez', '1986-03-29', 'Masculino', 'Casado', 'IV', 'Arica', 'Avenida 18 de Septiembre 678', '967890123', '967890123', '2018-12-10', 0, 4),
('27.789.012-3', 'Isabella', 'Cordero', 'Soto', '1993-10-05', 'Femenino', 'Soltero', 'X', 'Coquimbo', 'Calle Los Paltos 789', '978901234', '978901234', '2021-02-18', 1, 4),
('28.890.123-4', 'Fernando', 'Navarro', 'Fuentes', '1981-06-22', 'Masculino', 'Casado', 'VII', 'Rancagua', 'Avenida Central 890', '989012345', '989012345', '2017-09-09', 1, 4),
('29.901.234-5', 'Gabriela', 'Diaz', 'Muñoz', '1990-11-03', 'Femenino', 'Viudo', 'VI', 'Los Andes', 'Calle Independencia 901', '990123456', '990123456', '2022-03-12', 0, 5),
('30.012.345-6', 'Ricardo', 'Bravo', 'Torres', '1985-04-30', 'Masculino', 'Soltero', 'XIII', 'Santiago', 'Avenida Los Libertadores 012', '901234567', '901234567', '2020-05-25', 1, 5),
('31.123.456-7', 'Margarita', 'Vega', 'Cordero', '1992-07-08', 'Femenino', 'Casado', 'V', 'Viña del Mar', 'Calle Las Heras 123', '912345679', '912345679', '2019-01-18', 1, 1),
('32.234.567-8', 'Carlos', 'Castro', 'Molina', '1977-02-14', 'Masculino', 'Divorciado', 'VIII', 'Temuco', 'Calle Alemania 234', '923456780', '923456780', '2020-06-14', 1, 1),
('33.345.678-9', 'Patricia', 'Ramirez', 'Gonzalez', '1989-10-29', 'Femenino', 'Soltero', 'II', 'Puerto Montt', 'Avenida San Francisco 345', '934567891', '934567891', '2021-03-11', 0, 2),
('34.456.789-0', 'Alejandro', 'Pérez', 'Mora', '1994-05-20', 'Masculino', 'Casado', 'VII', 'Talca', 'Calle 6 Oriente 456', '945678902', '945678902', '2022-07-24', 0, 2),
('35.567.890-1', 'Nicole', 'Silva', 'Herrera', '1988-12-12', 'Femenino', 'Viudo', 'IX', 'Los Ángeles', 'Avenida 4 Norte 567', '956789013', '956789013', '2020-09-16', 1, 3),
('36.678.901-2', 'Eduardo', 'Moreno', 'Jimenez', '1984-03-05', 'Masculino', 'Casado', 'XII', 'La Serena', 'Calle Las Torres 678', '967890124', '967890124', '2021-10-30', 1, 3),
('37.789.012-3', 'Florencia', 'Martínez', 'Paredes', '1991-11-25', 'Femenino', 'Divorciado', 'IV', 'Antofagasta', 'Calle Rancagua 789', '978901235', '978901235', '2022-06-22', 1, 3),
('38.890.123-4', 'Raúl', 'Muñoz', 'Olivares', '1980-07-15', 'Masculino', 'Casado', 'VI', 'Rancagua', 'Avenida O’Higgins 890', '989012346', '989012346', '2021-04-08', 0, 4),
('39.901.234-5', 'Martina', 'Soto', 'Gómez', '1995-01-19', 'Femenino', 'Soltero', 'XIII', 'Santiago', 'Calle Los Bosques 901', '990123457', '990123457', '2023-02-14', 1, 4),
('40.012.345-6', 'Héctor', 'Ortega', 'Pérez', '1983-09-21', 'Masculino', 'Viudo', 'VIII', 'La Serena', 'Calle Talca 012', '901234568', '901234568', '2020-11-16', 0, 5),
('41.123.456-7', 'Juana', 'Cifuentes', 'Bravo', '1992-02-10', 'Femenino', 'Casado', 'VII', 'Talca', 'Calle Libertador 123', '912345680', '912345680', '2022-01-29', 1, 5),
('42.234.567-8', 'Felipe', 'Vásquez', 'Muñoz', '1987-08-07', 'Masculino', 'Divorciado', 'X', 'Coquimbo', 'Avenida del Mar 234', '923456781', '923456781', '2021-12-13', 1, 5),
('43.345.678-9', 'Carmen', 'Pérez', 'Vergara', '1980-10-04', 'Femenino', 'Soltero', 'IV', 'Puerto Montt', 'Calle Bernardo O’Higgins 345', '934567892', '934567892', '2022-07-07', 0, 1),
('44.456.789-0', 'Antonio', 'Rivas', 'Lozano', '1994-06-20', 'Masculino', 'Casado', 'XII', 'Iquique', 'Avenida Prat 456', '945678903', '945678903', '2023-05-30', 1, 1),
('45.567.890-1', 'Alejandra', 'Valenzuela', 'Cordero', '1990-04-18', 'Femenino', 'Viudo', 'VII', 'Rancagua', 'Calle 1 Norte 567', '956789014', '956789014','2023-05-30', 1, 1);
