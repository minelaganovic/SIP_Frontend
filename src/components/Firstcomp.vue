<template>
  <div class="card">
    <img class="card-img-top" src="@/assets/filep1.jpeg" alt="Card image cap" />
    <div class="card-body">
      <div class="col-sm-11">
        <h1 id="b">{{ costaap }}</h1>
        <p style="margin-top:40px; padding-left:8px;">
          Web application for controlling and tracking costs, revenue and
          budget.
        </p>
        <center>
          <div class="col-sm-6">
            <ul>
              <p
                style="font-family:23; font-family:Wide Latin;padding-top: 25px;"
              >
                {{ appl }}
              </p>
              <br />
              <li>Students;</li>
              <li>Families;</li>
              <li>Passengers;</li>
              <li>Workers;</li>
              <li>Companies and others...</li>
            </ul>
          </div>
        </center>
      </div>
      <div class="row" style="margin-top:50px">
        <h1 style="margin-bottom:50px" id="b">{{ key }}</h1>
        <div class="col-sm">
          <br /><img id="img1" src="@/assets/smile.svg" alt="..." />
          <p><b>Simply</b></p>
          <p>Cost management in a few clicks.</p>
        </div>
        <div class="col-sm">
          <br /><img id="img1" src="@/assets/Pametno.svg" alt="..." />
          <p><b>Smart</b></p>
          <p>Lost of features and options.</p>
        </div>
        <div class="col-sm">
          <br /><img id="img1" src="@/assets/Sigurno.svg" alt="..." />
          <p><b>Surely</b></p>
          <p>Password protection. Encryption of sensitive data.</p>
        </div>
      </div>
      <div class="row" id="red">
        <div class="col-sm">
          <br />
          <p><b>ABOUT US</b></p>
          <p>
            COSTAPP was developed by a COSTeam. We are dedicated team that loves
            their job, as well as their clients.
          </p>
        </div>
        <div class="col-sm">
          <br />
          <p><b>OUR MISSION</b></p>
          <p>
            Our goal and mission is to help people and companies discover its
            full financial potential.
          </p>
        </div>
        <div class="col-sm">
          <br />
          <p>
            <b>{{ mail }}</b>
          </p>
          <p>
            <i id="ikonica" class="fas fa-mail-bulk"></i>
            <i id="ikonica" class="fab fa-facebook-square"></i>
            <i id="ikonica" class="fab fa-whatsapp-square"></i>
            <i id="ikonica" class="fab fa-telegram"></i>
          </p>
        </div>
        <center><br /><i>© 2020 COSTAPP</i></center>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Firstcomp",
  data: function() {
    return {
      appl: "The application is used by:",
      mail: "CONTACT US:",
      costaap: "COSTAPP",
      key: "WE OFFER YOU",
    };
  },
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
#img {
  max-width: 100%;
  height: 500px;
}
.col-sm-6 {
  text-align: center;
  padding-left: 50px;
}
p,
li {
  font-size: 30px;
}
#h1 {
  padding-top: 30px;
}
#b {
  font-family: Wide Latin;
  font-size: 33px;
  padding-top: 25px;
}
.card {
  width: 100%;
  border: 0px;
  border-bottom: 20 px solid black;
}
#img1 {
  width: 130px;
  height: 90px;
}
#ikonica {
  width: 50px;
  height: 70px;
  margin-right: 5px;
}
#red {
  margin-top: 70px;
  padding-top: 50px;
  color: white;
  background-color: black;
  border: 0px;
}
</style>
