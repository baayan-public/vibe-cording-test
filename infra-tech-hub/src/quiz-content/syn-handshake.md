---
id: syn-handshake
title: TCPの3ウェイハンドシェイク
level: 1
levelName: SYN
topic: ネットワーク基礎
description: TCP接続確立の基本プロセスを理解する
---

# 1
TCPの3ウェイハンドシェイクで最初に送信されるフラグは？

## options
- a: ACK
- b: SYN
- c: FIN
- d: RST

## correctAnswer
b

## explanation
3ウェイハンドシェイクの最初のステップでは、クライアントがSYNフラグを立てたセグメントをサーバーに送信します。

# 2
3ウェイハンドシェイクの2番目のステップで、サーバーが送信するフラグの組み合わせは？

## options
- a: SYNのみ
- b: ACKのみ
- c: SYN+ACK
- d: FIN+ACK

## correctAnswer
c

## explanation
2番目のステップでは、サーバーがSYNとACKフラグを組み合わせたセグメントを送信します。SYNは自身の初期シーケンス番号を示し、ACKはクライアントのSYNに対する確認応答です。

# 3
3ウェイハンドシェイクの最後のステップでクライアントが送信するフラグは？

## options
- a: SYN
- b: ACK
- c: FIN
- d: RST

## correctAnswer
b

## explanation
最後のステップでは、クライアントがACKフラグを立てたセグメントを送信し、サーバーのSYN+ACKに対する確認応答を行います。