CREATE DATABASE IF NOT EXISTS kioskdb;


USE kioskdb;
DROP TABLE `user` CASCADE;


CREATE TABLE `user` (
	`user_idx` bigint primary key auto_increment,
	`user_id` varchar(255) NOT NULL unique,
	`user_pw` varchar(255) NOT NULL,
	`user_name` varchar(255) NOT NULL,
	`user_role` enum('ROLE_USER', 'ROLE_ADMIN') NOT NULL	DEFAULT 'ROLE_USER',
	`user_point` int	NOT NULL DEFAULT 0,
	`user_create_date`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`user_update_date`	datetime	NULL,
	`is_deleted`	boolean	NOT NULL	DEFAULT 0
);

DESC USER;

INSERT INTO USER VALUES (0, "admin", "admin", "admin", "ROLE_ADMIN", default, DEFAULT, null, DEFAULT);
INSERT INTO USER VALUES (0, "user1", "user1", "user1", "ROLE_USER", default, DEFAULT, null, DEFAULT);
INSERT INTO USER VALUES (0, "user2", "user2", "user2", "ROLE_USER", default, DEFAULT, null, DEFAULT);
INSERT INTO USER VALUES (0, "user3", "user3", "user3", "ROLE_USER", default, DEFAULT, null, DEFAULT);

SELECT * FROM USER;


--

CREATE TABLE `image` (
	`img_idx`	bigint primary key auto_increment,
	`img_name`	varchar(255)	NOT NULL,
	`img_url`	varchar(255)	NOT NULL
);

DESC IMAGE;

-- COFFEE 목록
INSERT INTO image VALUES (0, "카페 아메리카노", "coffee.png");
INSERT INTO image VALUES (0, "꿀 화이트 아메리카노", "coffee1.png");
INSERT INTO image VALUES (0, "꿀 미숫자루 커피", "coffee2.png");
INSERT INTO image VALUES (0, "달달커피", "coffee3.png");
INSERT INTO image VALUES (0, "시그니처라떼", "coffee4.png");
INSERT INTO image VALUES (0, "민트모히또 라떼", "coffee5.png");
INSERT INTO image VALUES (0, "바닐라 오트 콜드브루", "coffee6.png");
INSERT INTO image VALUES (0, "콜드브루 아메리카노", "coffee7.png");
INSERT INTO image VALUES (0, "콜드브루 라떼", "coffee8.png");
INSERT INTO image VALUES (0, "콜드브루 니트로", "coffee9.png");
INSERT INTO image VALUES (0, "화이트 비엔나", "coffee10.png");
INSERT INTO image VALUES (0, "연유 카페라떼", "coffee11.png");

-- BEVERAGE 목록
INSERT INTO image VALUES (0, "딸기 듬뿍 라떼", "beverage.png");
INSERT INTO image VALUES (0, "토피넛 라떼", "beverage1.png");
INSERT INTO image VALUES (0, "달고나 라떼", "beverage2.png");
INSERT INTO image VALUES (0, "버블 흑당 라떼", "beverage3.png");
INSERT INTO image VALUES (0, "초콜릿 라떼", "beverage4.png");
INSERT INTO image VALUES (0, "녹차라떼", "beverage5.png");
INSERT INTO image VALUES (0, "민트 초콜릿", "beverage6.png");
INSERT INTO image VALUES (0, "12곡 라떼", "beverage7.png");
INSERT INTO image VALUES (0, "고구마 라떼", "beverage8.png");
INSERT INTO image VALUES (0, "홍시 주스", "beverage9.png");
INSERT INTO image VALUES (0, "키위 주스", "beverage10.png");
INSERT INTO image VALUES (0, "딸기 주스", "beverage11.png");

-- FLATCCINO 목록
INSERT INTO image VALUES (0, "핑크펄 피치 자몽 플랫치노", "flatccino.png");
INSERT INTO image VALUES (0, "망고 플랫치노", "flatccino1.png");
INSERT INTO image VALUES (0, "꿀복숭아 플랫치노", "flatccino2.png");
INSERT INTO image VALUES (0, "초콜릿칩 플랫치노", "flatccino3.png");
INSERT INTO image VALUES (0, "플래인 요거트 플랫치노", "flatccino4.png");
INSERT INTO image VALUES (0, "블루베리 요거트 플랫치노", "flatccino5.png");

-- ICECREAM 목록
INSERT INTO image VALUES (0, "핑크펄 피치 아이스크림", "icecream.png");
INSERT INTO image VALUES (0, "화이트 피치 아이스크림", "icecream1.png");
INSERT INTO image VALUES (0, "아이스크림 복숭아 라떼", "icecream2.png");
INSERT INTO image VALUES (0, "소프트 아이스크림", "icecream3.png");
INSERT INTO image VALUES (0, "아이스크림 카페라떼", "icecream4.png");
INSERT INTO image VALUES (0, "꿀인절미 아이스크림", "icecream5.png");
INSERT INTO image VALUES (0, "초코쿠키 아이스크림", "icecream6.png");
INSERT INTO image VALUES (0, "딸기쿠키 아이스크림", "icecream7.png");
INSERT INTO image VALUES (0, "아이스크림 딸기라떼", "icecream8.png");
INSERT INTO image VALUES (0, "아보가토 오리지널", "icecream9.png");
INSERT INTO image VALUES (0, "디카페인 아보가토 오리지널", "icecream10.png");


-- BREAD 목록
INSERT INTO image VALUES (0, "피치러버 생크림 케이크", "bread.png");
INSERT INTO image VALUES (0, "크랜베리 월넛 베이글", "bread1.png");
INSERT INTO image VALUES (0, "플레인 베이글", "bread2.png");
INSERT INTO image VALUES (0, "청크초코칩 크루키", "bread3.png");
INSERT INTO image VALUES (0, "떠먹는 복숭아 요거트 롤케이크", "bread4.png");
INSERT INTO image VALUES (0, "꿀복숭아 팬케이크", "bread5.png");
INSERT INTO image VALUES (0, "대파베이컨 크림치즈 베이글", "bread6.png");
INSERT INTO image VALUES (0, "소금 버터 스콘", "bread7.png");
INSERT INTO image VALUES (0, "소금빵", "bread8.png");
INSERT INTO image VALUES (0, "플레인 크로플", "bread9.png");
INSERT INTO image VALUES (0, "허니 카라멜 브레드", "bread10.png");
INSERT INTO image VALUES (0, "생크림 와플", "bread11.png");
INSERT INTO image VALUES (0, "플레인 와플", "bread12.png");
INSERT INTO image VALUES (0, "메이플 와플", "bread13.png");
INSERT INTO image VALUES (0, "프레즐", "bread14.png");
INSERT INTO image VALUES (0, "크로크 무슈", "bread15.png");
INSERT INTO image VALUES (0, "잉글리쉬 머핀", "bread16.png");
INSERT INTO image VALUES (0, "크루아상", "bread17.png");


SELECT * FROM image;

--



CREATE TABLE `category` (
	`category_idx`	bigint primary key	auto_increment,
	`category_title`	varchar(255)	NOT NULL
);

DESC category;

INSERT INTO category VALUES (0, "COFFEE");
INSERT INTO category VALUES (0, "BEVERAGE");
INSERT INTO category VALUES (0, "FLATCCINO");
INSERT INTO category VALUES (0, "ICE CREAM");
INSERT INTO category VALUES (0, "BREAD");

SELECT * FROM CATEGORY;


--


CREATE TABLE `menu` (
	`menu_idx` bigint	primary key auto_increment,
	`category_idx`	bigint NOT NULL,
	`img_idx` bigint NOT NULL,
	`menu_name`	varchar(255)	NOT NULL,
	`menu_price`	int	NOT NULL,
	`menu_calory`	int	NOT NULL,
	`menu_code`	varchar(255)	NOT NULL	unique,
	`menu_recommend`	boolean	NOT NULL,
	`menu_create_date`	datetime	NOT NULL	DEFAULT now(),
	`menu_update_date`	datetime	NULL,
	`is_deleted`	boolean	NOT NULL DEFAULT 0,
	foreign key (category_idx) references category(category_idx)
	on update CASCADE,
	foreign key (img_idx) references image(img_idx)
	on update cascade
);

-- COFFEE 목록
INSERT INTO menu VALUES (0, 1, 1, "카페 아메리카노", 3200, 16, "1eeb7765-2ad0-4ddf-bb2a-4eb5697f85b4", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 2, "꿀 화이트 아메리카노", 3900, 300, "2b4bacad-b7c4-4855-8cc0-ef0f00dd9f61", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 3, "꿀 미숫자루 커피", 3900, 429, "809049db-1d67-4192-b935-e8e161eb92c6", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 4, "달달커피", 2900, 277, "e9646f50-f9ad-48f1-adf7-b63bac045179", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 5, "시그니처라떼", 4700, 501, "53abd5d7-72f7-4e03-b72a-2a374dc92a6e", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 6, "민트모히또 라떼", 4900, 409, "94c3fe81-de1f-4e55-90d3-918380516508", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 7, "바닐라 오트 콜드브루", 5200, 206, "c63c478c-b338-4c9f-954c-adc19f2c59f5", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 8, "콜드브루 아메리카노", 3900, 12, "d47f49a7-bb17-4afe-afbd-c991ed577f17", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 9, "콜드브루 라떼", 4500, 134, "d2c4104b-c7eb-4904-ab33-e0e9d4e78cb9", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 10, "콜드브루 니트로", 4200, 14, "56f770a0-91c0-41c4-a5ce-71402c05e742", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 11, "화이트 비엔나", 4900, 267, "781a61e4-f8bd-4d45-b472-6db07cf2ab34", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 1, 12, "연유 카페라떼", 4500, 354, "b03c6d5d-e92b-44b7-a34c-5d272b35896d", FALSE, DEFAULT, NULL, DEFAULT);

-- BEVERAGE 목록
INSERT INTO menu VALUES (0, 2, 13, "딸기 듬뿍 라떼", 4200, 220, "0cf3bf5d-8543-48ef-af47-c7c54820d364", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 14, "토피넛 라떼", 4200, 222, "99f2d05b-e541-4b47-91b5-1ed27602286e", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 15, "달고나 라떼", 3700, 281, "36dd2358-1203-4037-8459-8c8c15f3851a", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 16, "버블 흑당 라떼", 4700, 308, "6a38dacd-d744-425d-93b4-17940ffc2f57", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 17, "초콜릿 라떼", 3900, 318, "6d96e2aa-481a-4f5e-ad47-2152f92b6156", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 18, "녹차라떼", 3900, 191, "27d2b58d-2364-45d9-95ac-d7b3954019cc", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 19, "민트 초콜릿", 4200, 342, "5be69e38-f9c0-4cff-9e93-9a15a6cd20e0", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 20, "12곡 라떼", 3700, 239, "451e80a8-4679-471f-bae7-2bbdcc52f1fe", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 21, "고구마 라떼", 4200, 344, "1a8c441d-bc54-47c8-8e0c-1e583e62f36c", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 22, "홍시주스", 4500, 247, "0c30b0cb-aa8d-4761-bb5e-f861846ead68", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 23, "골드키위주스", 4500, 265, "e6156a06-a8bc-436b-9bd6-9ab74b6dae0f", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 2, 24, "피치망고 드링킹 요거트", 5400, 372, "9ea07473-f5e5-437f-98a8-33fbb5aa74de", TRUE, DEFAULT, NULL, DEFAULT);

-- FLATCCINO 목록
INSERT INTO menu VALUES (0, 3, 25, "핑크펄 피치 자몽 플랫치노", 4900, 310, "5f7df82a-9633-4d03-839c-c7ce39c5eb34", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 3, 26, "망고 플랫치노", 3900, 258, "29d46e58-9520-442a-895c-c1de27ebbae3", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 3, 27, "꿀복숭아 플랫치노", 3900, 225, "168e2eb8-ca3d-4e76-a2f2-6c1cf782b41e", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 3, 28, "초콜릿칩 플랫치노", 4500, 387, "fe1dfc68-bb72-414f-8aa2-1e072cd90f84", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 3, 29, "플래인 요거트 플랫치노", 4700, 229, "bec27a6b-25ae-4d9e-b1d8-181a99872c47", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 3, 30, "블루베리 요거트 플랫치노", 4700, 297, "cff3a4f2-07aa-4aaa-b39d-3ba9f5aacf8b", FALSE, DEFAULT, NULL, DEFAULT);

-- ICE CREAM 목록
INSERT INTO menu VALUES (0, 4, 31, "핑크펄 피치 아이스크림", 3000, 452, "6209edfe-876f-4c7e-942e-9c6aab771442", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 32, "화이트 피치 아이스크림", 3000, 262, "ee1d1c43-a8df-4553-aedd-4afb13484916", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 33, "아이스크림 복숭아 라떼", 4500, 327, "399a506c-049f-45d2-ba43-a8b15e5e25bd", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 34, "소프트 아이스크림", 2000, 218, "19a2fc74-e45d-4504-a5f6-c8bcf9ac4f00", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 35, "아이스크림 카페라떼", 4500, 248, "91dd73f6-afac-4e71-991f-05fec51bbb71", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 36, "꿀인절미 아이스크림", 2500, 297, "7616f5ee-ee53-4f80-befe-3e8bf6aa6601", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 37, "초코쿠키 아이스크림", 3000, 272, "406dc8ad-a5ef-4a97-b304-18c2d4af2655", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 38, "딸기쿠키 아이스크림", 3500, 266, "5d23e357-8c09-4521-92a3-ff2dc4946890", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 39, "아이스크림 딸기라떼", 4500, 307, "e93921e9-efd4-4c69-a9a7-5e950d5d0995", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 40, "아보가토 오리지널", 4700, 176, "ba661799-4957-424d-a45e-dc5874f8fed4", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 4, 41, "디카페인 아보가토 오리지널", 5000, 173, "a2246689-a787-4fa8-8b17-f94a6d9191c5", FALSE, DEFAULT, NULL, DEFAULT);

-- BREAD
INSERT INTO menu VALUES (0, 5, 42, "피치러버 생크림 케이크", 15900, 809, "9b64530a-939a-4032-bb2f-b694b5ad5a30", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 43, "크랜베리 월넛 베이글", 2500, 295, "a5161e3b-4acf-4d1f-abc9-6ccef3a63d4d", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 44, "플레인 베이글", 2500, 283, "619ac3bb-592f-45e1-90d9-63206d9ee3d0", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 45, "청크초코칩 크루키", 4600, 557, "32595def-eb94-4fc1-bb95-7557d3c5107a", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 46, "떠먹는 복숭아 요거트 롤케이크", 5500, 380, "53c1d4c5-7847-4122-835e-bff391b770fe", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 47, "꿀복숭아 팬케이크", 6600, 570, "5c17b171-75d6-4dd2-bf9c-43b1748692d6", TRUE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 48, "대파베이컨 크림치즈 베이글", 4200, 445, "8dbe9886-f554-490d-a8e3-de3e48157f06", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 49, "소금 버터 스콘", 2900, 475, "9559e5f0-e137-4a86-857c-ef5eba043c56", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 50, "소금빵", 3000, 207, "4bc3e4d4-bd69-411f-8522-636513e4b704", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 51, "플레인 크로플", 2900, 265, "9e21c78d-2946-4241-a33b-f79a8003af23", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 52, "허니 카라멜 브레드", 5200, 746, "10e8209c-cf76-4c23-9fa4-0927b36b51f1", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 53, "생크림 와플", 2900, 397, "77655cae-8470-4496-95b0-36754fed0f6f", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 54, "플레인 와플", 2700, 327, "1f65e23a-e19e-4c73-bc2b-113ecbd831db", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 55, "메이플 와플", 3200, 354, "4debcd10-d125-4e2d-9b7f-842782b9a98b", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 56, "프레즐", 2700, 250, "63ef849f-894c-4243-a314-f3f6463dc95c", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 57, "크로크 무슈", 4700, 457, "49af93ca-b371-4b2d-a5f5-42ff6bffacbc", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 58, "잉글리쉬 머핀", 3700, 278, "d97f2ed2-f41a-405f-a545-6241d08a8c1e", FALSE, DEFAULT, NULL, DEFAULT);
INSERT INTO menu VALUES (0, 5, 59, "크루아상", 2900, 260, "a2a7fdc5-a9b4-4031-832a-04cd96594cf6", FALSE, DEFAULT, NULL, DEFAULT);


SELECT * FROM menu;


--


CREATE TABLE `order_menu` (
	`order_idx`	bigint	primary key auto_increment,
	`order_code`	varchar(255)	NOT NULL unique,
	`order_price`	int	NOT NULL,
	`order_count`	int	NOT NULL,
	`order_number`	int	NOT NULL	DEFAULT 1,
	`order_status`	enum('결제완료', '결제중')	NOT NULL	DEFAULT '결제완료',
	`order_time`	datetime	NOT NULL	DEFAULT now(),
	`order_update_date`	datetime	NULL,
	`is_deleted`	boolean	NOT NULL	DEFAULT 0
);

INSERT INTO `order_menu` VALUES (0, "ea7fbe75-db66-42ce-9498-81675ce6e6ce", 10000, 2, default, DEFAULT, DEFAULT, NULL, default);



SELECT * FROM `order_menu` ;


DROP TABLE `order_menu` CASCADE;
DROP TABLE `menu` CASCADE;
DROP TABLE `category` CASCADE;
DROP TABLE `image` CASCADE;