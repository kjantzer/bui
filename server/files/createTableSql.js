module.exports = (tableName='files')=>{ return /*sql*/`
CREATE TABLE ${tableName} (
id int(11) NOT NULL AUTO_INCREMENT,
parent_id int(11) DEFAULT NULL COMMENT 'May be used to link another record',
group_name varchar(128) DEFAULT NULL COMMENT 'A way to group uploads files into sets for specific uses',
filename varchar(128) DEFAULT NULL,
ext varchar(10) DEFAULT NULL,
size bigint(40) DEFAULT NULL,
type varchar(45) DEFAULT NULL,
dir_path varchar(200) DEFAULT NULL,
orig_filename varchar(128) DEFAULT NULL,
user_id int(11) DEFAULT '0' COMMENT 'Who uploaded this file?',
src varchar(128) DEFAULT NULL COMMENT 'Where did the upload come from?',
md5 varchar(64) DEFAULT NULL,
has_preview tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Whether a .preview.jpg was created',
description varchar(1000) DEFAULT NULL,
traits json DEFAULT NULL COMMENT 'Area to add extra data about file (eg: ordinal, primary, etc)',
ts_created timestamp NULL DEFAULT CURRENT_TIMESTAMP,
ts_updated timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
KEY id (id) USING BTREE,
KEY group_name (group_name) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='A central table for tracking uploaded files'
`}