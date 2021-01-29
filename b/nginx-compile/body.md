## 컴파일 환경

- Ubuntu 20.04.1

## 의존성 설치

``` bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install cmake wget gcc g++ git -y
```

## 다운로드

``` bash
wget https://nginx.org/download/nginx-1.19.6.tar.gz
tar -zxf nginx-1.19.6.tar.gz
wget https://ftp.pcre.org/pub/pcre/pcre-8.44.tar.gz
tar -zxf pcre-8.44.tar.gz
wget http://zlib.net/zlib-1.2.11.tar.gz
tar -zxf zlib-1.2.11.tar.gz
git clone https://github.com/google/ngx_brotli.git
cd ngx_brotli
git submodule update --init
cd ..
wget https://www.openssl.org/source/openssl-1.1.1i.tar.gz
tar -zxf openssl-1.1.1i.tar.gz
git clone https://github.com/aperezdc/ngx-fancyindex.git
```

## Configure

``` bash
cd nginx-1.19.6

./configure --prefix=/etc/nginx \
--sbin-path=/usr/sbin/nginx \
--modules-path=/usr/lib/nginx/modules \
--conf-path=/etc/nginx/nginx.conf \
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--pid-path=/var/run/nginx.pid \
--lock-path=/var/run/nginx.lock \
--http-client-body-temp-path=/var/cache/nginx/client_temp \
--http-proxy-temp-path=/var/cache/nginx/proxy_temp \
--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
--http-scgi-temp-path=/var/cache/nginx/scgi_temp \
--user=nginx \
--group=nginx \
--with-compat \
--with-file-aio \
--with-threads \
--with-http_addition_module \
--with-http_auth_request_module \
--with-http_dav_module \
--with-http_flv_module \
--with-http_gunzip_module \
--with-http_gzip_static_module \
--with-http_mp4_module \
--with-http_random_index_module \
--with-http_realip_module \
--with-http_secure_link_module \
--with-http_slice_module \
--with-http_ssl_module \
--with-http_stub_status_module \
--with-http_sub_module \
--with-http_v2_module \
--with-mail \
--with-mail_ssl_module \
--with-stream \
--with-stream_realip_module \
--with-stream_ssl_module \
--with-stream_ssl_preread_module \
--with-openssl=../openssl-1.1.1i \
--with-pcre=../pcre-8.44 \
--with-zlib=../zlib-1.2.11 \
--add-module=../ngx_brotli \
--add-module=../ngx-fancyindex
```

## 빌드

``` bash
make
```

## 설치

``` bash
make install
adduser nginx
mkdir /var/cache/nginx
```
