import { createPicker } from "picmo";

const picmo = {
  name: "picmo",
  display: "submenu",
  title: "Emoji",
  buttonClass: "",
  innerHTML:
    '<div class="se-btn-module"><button type="button" class="se-btn se-btn-module" title="Insert Emoji"><span style="font-size:18px">😀</span></button></div>',

  add: function (core, targetElement) {
    // @Required
    // Registering a namespace for caching as a plugin name in the context object
    const context = core.context;
    let listDiv = this.setSubmenu(core);

    context.customSubmenu = {
      targetButton: targetElement,
      textElement: null,
      currentSpan: null,
      listDiv: listDiv,
    };

    // @Required
    // You must add the "submenu" element using the "core.initMenuTarget" method.
    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv);
  },

  setSubmenu: function (core) {
    const listDiv = core.util.createElement("DIV");
    // @Required
    // A "se-submenu" class is required for the top level element.
    listDiv.className = "se-submenu se-list-layer se-list-emoji-picmo";
    listDiv.innerHTML =
      "" +
      '<div class="se-list-inner">' +
      '<div class="emoji-picmo-container"></div>' +
      "</div>";

    return listDiv;
  },

  // @Override core
  // Plugins with active methods load immediately when the editor loads.
  // Called each time the selection is moved.
  active: function (element) {
    this.submenuOff();

    return false;
  },

  // @Override submenu
  // Called after the submenu has been rendered
  on: function () {
    //this.context.customSubmenu.textElement.focus();

    const picker = createPicker({
      rootElement: this.submenu,
    });

    picker.addEventListener("emoji:select", (selection) => {
      this.functions.insertHTML(selection.emoji, true, true);
    });
  },

  onClickRemove: function () {
    this.submenuOff();
  },
};

export { picmo };
