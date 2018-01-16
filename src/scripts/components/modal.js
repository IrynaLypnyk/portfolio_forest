module.exports = {
  template: '#modal-template',

  props: ['text', 'show'],

  data: function() {
    return{
      msg: 'result',
    };
  },

  mounted: function() {
    console.log('hello file!');
  },

  methods: {
    onClick: function() {
      this.$emit('clicked', this.msg);
      console.log('clicked');
    },
  },
};