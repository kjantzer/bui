
exports.comments = /*sql*/`CREATE TABLE comments (
  id int(11) NOT NULL AUTO_INCREMENT,
  group varchar(128) DEFAULT NULL,
  gid int(11) DEFAULT NULL COMMENT 'group ID',
  uid int(11) DEFAULT NULL COMMENT 'user ID',
  comment text,
  comment_plain text COMMENT 'non-html version',
  meta json DEFAULT NULL COMMENT 'optional free form metadata',
  type varchar(48) NOT NULL DEFAULT 'user' COMMENT 'user or system comment',
  ts_created timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  ts_updated timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY fk_comment_user (uid) USING BTREE,
  KEY group (group) USING BTREE,
  KEY gid (gid) USING BTREE,
  KEY group_id (group,gid) USING BTREE,
  CONSTRAINT fk_comment_user FOREIGN KEY (uid) REFERENCES users (id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Central table for comments/threads';`

exports.comment_reads = /*sql*/`CREATE TABLE comment_reads (
  id int(11) NOT NULL AUTO_INCREMENT,
  cid int(11) DEFAULT NULL,
  uid int(11) DEFAULT NULL,
  ts_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq (cid,uid) USING BTREE,
  KEY fk_read_comment_user (uid),
  CONSTRAINT fk_read_comment FOREIGN KEY (cid) REFERENCES comments (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_read_comment_user FOREIGN KEY (uid) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`