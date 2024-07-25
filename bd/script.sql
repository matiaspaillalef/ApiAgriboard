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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



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
