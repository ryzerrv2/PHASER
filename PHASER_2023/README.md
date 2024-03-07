# Oh no, I played again

## </noname>

## 1 Intro

Domfy, il protagonista, adora giocare d’azzardo. Più gioca, più perde soldi e
più ha voglia di scommettere per recuperare ciò che ha perso. Quando non ha
soldi a disposizione li va a chiedere a persone poco raccomndabili immischiate in
affari sporchi con la Mafia e per questo finirà nei guai. I mafiosi pretendono di
riavere i soldi indietro ma Domfy non può resistuirli, così iniziano ad inseguirlo
per ammazzarlo. Durante la corsa finisce in un tunnel spazio temporale.

## 2 Marte

## 2.1 Scena 1

Ambientazione: stanza con la lava, idealmente l’interno di un vulcano. In giro
per la mappa ci sono posizionati quattro personaggi che porranno una domanda,
tra cui:

1. Quanto dura una rotazione terrestre sul proprio asse?

```
(a) 23h 58m
(b) 24h
(c) 23h 56m(*)
```
2. Quale fu il primo popolo ad utilizzare l’ora?

```
(a) Aztechi
(b) Babilonesi(*)
(c) Maya
```
3. Come si chiama l’orologio tradizione del sud della Germania?

```
(a) Cucù nero(*)
(b) Cucù bianco
(c) Cucù giallo
```
4. In quale strato atmosferico si verifica la maggior parte del tempo atmos-
    ferico?

```
(a) Troposfera(*)
(b) Litosfera(*)
(c) Termosfera(*)
```
Ogni risposta corretta darà una cifra del numero: 1919, anno in cui Arthur
Eddington dimostrò la deviazione gravitazionale usando una lastra raffigurante
un eclissi solare.
Il pin viene usato per sbloccare una cassaforte che ha come indizio per ordinare
le cifre:Arthur Eddington. All’interno della cassaforte sono posizionate le chiavi
dell’astronave.
Per ogni risposta sbagliata il tempo del livello diminuisce secondo l’equazione:
```LaTeX
t=t-\frac{1}{4}
```

dove

- T è la durata totale del livello (2 minuti)
- t è il tempo attualmente disponibile (una parte dei 2 minuti)

### 2.2 Scena 2

Purtroppo le chiavi non bastano per mettere in moto l’astronave: servono dei
pezzi di ricambio. Per trovarli bisogna uscire dal vulcano e cercare i pezzi di
ricambio che spawnano casualmente nella mappa.
ATTENZIONE: all’esterno del vulcano i mafiosi riusciranno ad individuare il
personaggio, ferirlo ed eventualmente ucciderlo.
Una volta recuperati i pezzi di ricambio si può mettere in moto l’astronave.

### 2.3 Fisica

Il tempo scorrer`a secondo le caratteristiche fisiche di Marte, per cui, per ogni
secondo passato per il giocatore nella vita reale sulla terra, equivarr`a a:

```
x=
88620 s
86164 s
```
```
= 1, 028 s (2)
```
## 3 Urano

Se Domfy tornasse sulla Terra dovrebbe comunque vedersela con i mafiosi, non
potendo pagare i debiti. Per questo motivo fa prima una sosta su Saturno su
cui piovono diamanti ;).
Qui l’ambientazione `e pi`u semplice: un paesaggio ghiacciato in cui muoversi
sull’asse X per poter raccogliere quanti pi`u diamanti in 1 minuto. Una volta
raccolti i diamanti Domfy torna alla navicella e si mette in viaggio per la Terra.


### 3.1 Fisica

```
Questa volta consideriamo le variazioni non solo del tempo, ma anche della forza
di gravit`a.
Il tempo scorrer`a secondo le caratteristiche fisiche di Saturno, per cui, per
ogni secondo passato per il giocatore nella vita reale sulla terra, equivarr`a a:
```
```
x=
```
```
62040 s
86164 s
```
```
= 0, 720 s (3)
```
```
La gravit`a terrestre `e
g= 9, 81
```
```
m
s^2
```
#### (4)

```
mentre su Urano `e pari a
g= 8, 87
m
s^2
```
#### (5)

. Ci`o vuol dire che mentre il tempo scorre pi`u velocemente, la forza di gravit`a
`e minore: gli oggetti scenderanno abbastanza lentamente e questo comporta la
difficolt`a del livello.

## 4 Viaggio Urano-Terra

```
I mafiosi sono rimasti in ricognizione su Saturno e stanno aspettando che Domfy
passi per potergli sparare. Il viaggio Domfy viene dunque complicato da due
fattori: i mafiosi nella navicella dietro di lui che cercano di sparargli; gli asteroidi
e i meteoriti da schivare.
```
### 4.1 Fisica

```
Possibile implementazione: tempo che scorre diversamente a seconda dell’orbita
gravitazionale del pianeta vicino cui ci troviamo.
```
## 5 Terra

```
Bisogna arrivare al covo del mafioso per consegnargli i diamanti e ripagare il
debito. Qui si scopre se il numero di diamanti raccolti `e sufficiente: in caso
affermativo si vince, altrimenti vincono i mafiosi.
```

