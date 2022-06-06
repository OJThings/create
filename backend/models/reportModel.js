const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    ques1: {
      type: String,
      required: [false, "Please add a text value"],
    },
    ques2: {
      type: String,
      required: [false, "Please add a text value"],
    },
    ques3: {
      type: String,
      required: [false, "Please add a text value"],
    },

    inctype: {
      type: String,
      required: [false, "Please add a text value"],
    },
    status: {
      type: String,
      required: [false, "Please add a text value"],
    },
    desc: {
      type: String,
      required: [false, "Please add a text value"],
    },

    ans1: {
      type: String,
      required: [false, "Please add a text value"],
    },
    ans2: {
      type: String,
      required: [false, "Please add a text value"],
    },
    ans3: {
      type: String,
      required: [false, "Please add a text value"],
    },

    titledesc: {
      type: String,
      required: [false, "Please add a text value"],
    },
    uid: {
      type: String,
      required: [false, "Please add a text value"],
    },
    gua: {
      type: String,
      required: [false, "Please add a text value"],
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    header: {
      type: String,
      required: true,
      default:
        "https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/242865177_3887846774648522_5958541561794474525_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEP2IVqX3kAQUBpu-Rl7G5D3bvpxV2g0andu-nFXaDRqcDeHK_K7jfERGDk-m2CGHdOQA9tEybN20dn4eqzTD-o&_nc_ohc=4ujpLewS1JQAX9F4Buc&_nc_ht=scontent.fmnl17-3.fna&oh=00_AT-1WQnlMagYYOfhcurDdw9lngjZpOE01Bi4xC69KY5_Bg&oe=629903D0",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
