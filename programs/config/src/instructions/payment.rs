use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

#[derive(Accounts)]
pub struct Payment<'info> {

}

pub fn payment_handler(ctx: Context<Payment>, amount: u64) -> Result<()> {

}
