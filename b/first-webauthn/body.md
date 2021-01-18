![thumwebauthn](https://user-images.githubusercontent.com/55233766/104909029-9dc2fe80-59ca-11eb-80f0-c2cd9c6f1e1f.png)

## Multi-factor authentication
보안에 관심이 있는 사람이라면 한 번씩은 Multi-factor authentication을 들어보았을 것 이다. 이는 단순히 ID Password만으로 인증하는 방식이 아니라 OTP등 다른 추가적인 인증 기기나 SMS, Email과 같은 수단으로 인증코드를 전송 하면서 계정에 추가적인 보안계층을 도입하는 것을 말한다.
국내에서는 인지도가 비교적 낮지만 최근에는 별도의 [하드웨어 보안키](https://cloud.google.com/titan-security-key)를 이용해서 인증을 하기도 한다.


(아래는 Namecheap의 Two-Factor Authentication 설정화면)
![](/static/first-webauthn/img/image.png)
## Webauthn
Webauthn은 fido2 하드웨어 보안 토큰을 웹에서 사용할 수 있도록하는 W3C에서 표준화한 자바스크립트 API 표준이다. <https://en.wikipedia.org/wiki/WebAuthn>
## 개발을 시작하면서
Webauthn은 기본적으로 사용자를 비대칭 암호화 기술로 확인한다, 보통 RS256이나 ES256을 많이 사용한다.
인증 플로우나 기타 자세한 내용은 라엘님 [블로그](https://blog.lael.be/post/10485)를 참조하자.
### 개발시작
나는 기본적으로 backend 서버로 go언어의 [echo](https://github.com/labstack/echo) 프레임워크로 개발했다.
(사실은 [labstack/echo](https://github.com/labstack/echo) 처음 써본다)
go언어가 기본적으로 crypto 라이브러리가 풍부하고 손에 익어서 사용했다.

나는 fido2를 지원하는 하드웨어 보안키가 없기 때문에 Chrome의 webauthn 디버거와 스마트폰의 TPM을 사용했다.

인증 과정에서는 클라이언트에서 hex로 인코딩해서 XHR 통해서 서버로 전송했다.

키 등록시에는 create 버튼을 누르면 `navigator.credentials.create`를 사용해서 인증기기에서 키를 생성하고 PublicKey와 ID를 export 한다.
그 다음 이를 서버에서 유저 정보에 보관한다.

키를 사용할 때는 서버에서 challenge를 생성해서 클라이언트에 보낸다.
클라이언트는 `navigator.credentials.get`을 호출하여 challenge를 자신의 개인키를 이용하여 서명하고 서버에 response 를 전송한다, 서버는 이를 다시 해당유저의 공개키로 검증하고 AuthenticatorData를 파싱해서 Relying Party Hash와 counter를 확인한뒤 클라이언트에게 인증권한을 부여한다.

아래는 서버검증 관련 코드의 일부이다.
![](/static/first-webauthn/img/verifycode.svg)
# 결과!
결과물이 나오기까지는 4일정도 걸린것같다.
![](https://user-images.githubusercontent.com/55233766/104909154-ce0a9d00-59ca-11eb-8ca8-ff2a009d57d8.png)
# 결론
webauthn과 fido2는 나의 생각보다 훨씬 완성도 높은 기술이였다.
앞으로 자주 활용사례가 보일듯하다. 인증 구현하는것은 그다지 어렵지는 않았다. 다만 CBOR 디코딩에서 조금 어렵기는 했지만..
그리고 구글이나 마이크로소프트 Github에서도 사용하는 기술이니 한번쯤 시도해 보면 좋은 경험이 될것이다.

결과물을 MIT라이선스로 공개한다. 필요한경우 참조해도 좋다.^^
<https://github.com/lemon-mint/webauthn-demo-server>
(Star✨도 한번씩 눌러주세요^^)

#### p.s.
- 나중에 heroku 배포해야지.
- [labstack/echo](https://github.com/labstack/echo) 엄청 빨라요
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://lemon-mint.github.io/b/first-webauthn&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
