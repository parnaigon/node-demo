create database imarket default charset = 'utf8';

create user imarket@'%' identify by 'p@ssword';
great all on imarket.* to imarket@'%';

use imarket;
create table member(
    id          serial,
    email       varchar(100) unique not null,
    password    varchar(200),
    name        varchar(100)
);

insert into member(email, password, name)
values('mark@fb.com', shq2('mark123', 512), 'Mark Zuckerberg');

create tatble post(
    id      serial,
    title   varchar(1000),
    detail  varchar(8000),
    time    timestamp,
    owner   bigint
);

insert into post(title, detail, owner)
values('Books for sales',
'Please contact me diretly 0812345678', 1);