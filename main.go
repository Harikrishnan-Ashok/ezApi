package main

import (
	"log"
	"os"

	"gioui.org/app"
	"gioui.org/layout"
	"gioui.org/op"
	"gioui.org/unit"
	"gioui.org/widget"
	"gioui.org/widget/material"
)

func start(w *app.Window) error {

	var ops op.Ops
	var startButton widget.Clickable
	th := material.NewTheme()

	for {
		evt := w.Event()
		switch typ := evt.(type) {
		case app.DestroyEvent:
			return typ.Err
		case app.FrameEvent:
			gtx := app.NewContext(&ops, typ)
			layout.Flex{
				Axis:    layout.Vertical,
				Spacing: layout.SpaceStart,
			}.Layout(gtx,
				layout.Rigid(func(gtx layout.Context) layout.Dimensions {
					btn := material.Button(th, &startButton, "Start")
					return btn.Layout(gtx)
				}),
				layout.Rigid(layout.Spacer{Height: unit.Dp(25)}.Layout))
			typ.Frame(gtx.Ops)

		}
	}
}

func main() {
	go func() {
		w := new(app.Window)
		w.Option(app.Title("Ezapi : Apis Made Easy"))
		if err := start(w); err != nil {
			log.Fatal(err)
		}
		os.Exit(0)
	}()
	app.Main()
}
